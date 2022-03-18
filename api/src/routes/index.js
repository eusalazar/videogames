const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require ('./videogames')
const videogame = require ('./videogame')
const genres = require ('./genres')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


 // Busco los 100 primeros videogames o ?name="nemo" busco los de ese nombre
 router.get('/videogames', videogames);
 router.get('/videogames/:id', videogame)
 router.get('/genres', genres)

 


module.exports = router;
