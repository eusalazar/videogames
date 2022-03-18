const axios = require('axios');
const { Genre } = require ('../db.js');
const { VIDEOGAMES_API_KEY } = process.env;

const handler = async (req, res) => {
    try {
        const infoApi = await axios.get( `https://api.rawg.io/api/genres?key=${ VIDEOGAMES_API_KEY }`)
        const gamesGenres = await infoApi.data.results;
        gamesGenres.map(e => {
            return Genre.findOrCreate({
                where: {
                    name: e.name,
                }
            })
        });
        const allGenres = await Genre.findAll();
        return res.status(200).json(allGenres);
        
    } catch (err) {
        console.log(err)
    }
};

module.exports = handler;