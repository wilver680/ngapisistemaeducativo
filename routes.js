/*const express = require('express');
const respuesta = require('../../red/respuestas');
const router = express.Router();

router.get('/', function (req, res) {
    respuesta.success(req, res, 'Clientes OK', 200);
});


module.exports = router;*/

const express = require('express');
const respuesta = require('./respuestas');
const colegio = require('./servicios/serviciosgral/serviciogrcolegio');
const curso = require('./servicios/servicioscol/serviciocolcursos')
const nivel = require('./servicios/servicioscol/serviciocolnivel')


const router = express.Router();

//get colegios
router.get('/v1/colegios', async (req, res, next) => {
    try {
        const datos = await colegio.obtenercolegios();
        return respuesta.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
});

//post colegios
router.post('/v1/colegios', async (req, res, next) => {
    try {
        const creado = await colegio.crearcolegio(req.body);
        return respuesta.success(req, res, creado, 201);
    } catch (error) {
        next(error);
    }
});

//modificar datos del colegio
router.patch('/v1/colegios/:id', async (req, res, next) => {
    try {
        const actualizado = await colegio.actualizarcolegio(
            req.params.id,
            req.body
        );

        return respuesta.success(req, res, actualizado, 200);
    } catch (error) {
        next(error);
    }
});



//cursos
//get cursos
router.get('/v1/cursos', async (req, res, next) => {
    try {
        const datos = await curso.obtenercurso();
        return respuesta.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
});


//post colegios
router.post('/v1/cursos', async (req, res, next) => {
    try {
        const creado = await curso.crearcurso(req.body);
        return respuesta.success(req, res, creado, 201);
    } catch (error) {
        next(error);
    }
});

//modificar datos del colegio
router.patch('/v1/cursos/:id', async (req, res, next) => {
    try {
        const actualizado = await curso.actualizarcurso(
            req.params.id,
            req.body
        );

        return respuesta.success(req, res, actualizado, 200);
    } catch (error) {
        next(error);
    }
});




//niveles
//get niveles
router.get('/v1/nivel', async (req, res, next) => {
    try {
        const datos = await nivel.obtenernivel();
        return respuesta.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
});



module.exports = router;