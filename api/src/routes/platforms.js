const  axios  = require ('axios');
const { VIDEOGAMES_API_KEY } = process.env;


const handler = async (req, res) => {
    const platformsNames = {}
    const urlInfo = await axios.get(`https://api.rawg.io/api/games?key=${ VIDEOGAMES_API_KEY }&page_size=100`);
    urlInfo.data.results.forEach((e) => {
        e.platforms?.forEach(e => platformsNames[e.platform.name] = null)
    })
    const platforms = Object.keys(platformsNames)
    res.send(platforms).status(200)
};

module.exports = handler;