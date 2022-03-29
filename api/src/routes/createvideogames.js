const  axios  = require ('axios');
const { Videogame, Genre} = require ('../db.js');


const handler = async (req, res) => {
    const { name, description, image, released, rating, platforms, genres } = req.body;

    try {
        const newGames = await Videogame.create({
            name,
            description,
            image,
            released,
            rating,
            platforms,
            createInBD: true

        })
        const bdGenres = await Genre.findAll({
            where : {name: genres}
        })
        newGames.addGenre(bdGenres)
        res.status(200).send(newGames)
    } catch (err) {
        console.log(err)
        return res.status(403).send('Se produjo un error')
    }
};

module.exports = handler;