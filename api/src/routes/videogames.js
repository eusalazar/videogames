const { Router } = require ('express');
const  axios  = require ('axios');
const { Videogame, Genre } = require ('../db.js');
const { VIDEOGAMES_API_KEY } = process.env;


const router = Router();
//ME TRAIGO TODOS LOS VIDEOJUEGOS DE LA API
const getAllVideoGames = async () => {
    const urlInfo = await axios.get(`https://api.rawg.io/api/games?key=${ VIDEOGAMES_API_KEY }`);
    const parseGam = (e) => ({////creo quna fn y le paso r como parametro
            id: e.id,
            name: e.name,
            image: e.background_image,
            platform:e.platform?.map(e => e.platform.name),
            genres: e.genres.map(e => e.name),
            rating:e.rating
   })
   const data = await urlInfo.data.results.map(parseGam)
    return data  
};

//HAGO UN REQUEST A LA API CON NAME INGRESADO COMO QUERY 
const getApi = async (name) => {
    const apiInfo = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${VIDEOGAMES_API_KEY}`)
    try{
    const parseGames = await apiInfo.data.results.map((e) => {
        return {
            id: e.id,
            name: e.name,
            image: e.background_image,
            platform:e.platform?.map(e => e.platform.name),
            genres: e.genres?.map(e => e.name),
            rating:e.rating
        }
    })
    return parseGames;
    } catch (err) {
        console.log(err)
    }
};
//HAGO UNA REQUEST A LA BASE DE DATOS CON NAME INGRESADO COMO QUERY
const getBd = async (name) => {
    try {
    return await Videogame.findAll({
        where: {
            name:name
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
} catch (err) {
    console.log(err)
}
    
};

//CONCATENO MIS DOS REQUESTS
const getAllName = async (name) => {
        const apiData = await getApi(name);
        const bdData = await getBd (name);
        const conc = apiData.concat(bdData)
        return conc;
    
};


const handler = async (req, res) =>{ //el query ?name(atributo)...(y lo q le pase x q )
    const { name } = req.query; 
    const allVideoGames = await getAllVideoGames();
    if(name){
        try{
            const searchName = await getAllName(name)
            if(searchName.length > 0){
                return res.status(200).send(searchName.slice(0,15))
            } else {
                res.status(400).send('No exite un videojuego con ese nombre')
            }
        } catch (err) {
            console.log(err)
        }
    } else {
        return res.send(allVideoGames)

    } 
}

module.exports = handler