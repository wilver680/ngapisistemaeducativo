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
const anioescolar = require('./servicios/servicioscol/serviciocolanioescolar')
const asignacionmaestro = require('./servicios/servicioscol/serviciocolasignaciomaestro')
const conceptopago = require('./servicios/servicioscol/serviciocolconceptopago');
const consultasmedicas = require('./servicios/servicioscol/serviciocolconsultamedica');
const cursomaestro = require('./servicios/servicioscol/serviciocolcursomaestro');


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


//anioescolar
//get anioescolar
router.get('/v1/anioescolar', async (req, res, next) => {
    try {
        const datos = await anioescolar.obteneranioescolar();
        return respuesta.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
});

//post anioescolar
router.post('/v1/anioescolar', async (req, res, next) => {
    try {
        const creado = await anioescolar.crearanioescolar(req.body);
        return respuesta.success(req, res, creado, 201);
    } catch (error) {
        next(error);
    }
});

//modificar datos del colegio
router.patch('/v1/anioescolar/:id', async (req, res, next) => {
    try {
        const actualizado = await anioescolar.actualizaranioescolar(
            req.params.id,
            req.body
        );

        return respuesta.success(req, res, actualizado, 200);
    } catch (error) {
        next(error);
    }
});


//asignacion maestro
//get asignacion maestro
router.get('/v1/asignacionmaestro', async (req, res, next) => {
    try {
        const datos = await asignacionmaestro.obtenerasignacionmaestro();
        return respuesta.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
});

// POST: crear una nueva asignación de maestro
router.post('/v1/asignacionmaestro', async (req, res, next) => {

    try {

        const creado =
            await asignacionmaestro.crearasignacionmaestro(req.body);

        return respuesta.success(req, res, creado, 201);

    } catch (error) {

        next(error);

    }

});

//modificar datos del colegio
router.patch('/v1/asignacionmaestro/:id', async (req, res, next) => {
    try {
        const actualizado = await asignacionmaestro.actualizarasignacionmaestro(
            req.params.id,
            req.body
        );

        return respuesta.success(req, res, actualizado, 200);
    } catch (error) {
        next(error);
    }
});


// ======================================================
// CONCEPTOS DE PAGO
// ======================================================


// GET: obtener todos los conceptos de pago
router.get('/v1/conceptopago', async (req, res, next) => {
    try {
        const datos =
            await conceptopago.obtenerconceptospago();

        return respuesta.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
});


// POST: crear un nuevo concepto de pago
router.post('/v1/conceptopago', async (req, res, next) => {
    try {
        const creado =
            await conceptopago.crearconceptopago(req.body);

        return respuesta.success(req, res, creado, 201);
    } catch (error) {
        next(error);
    }
});


// PATCH: modificar parcialmente un concepto de pago
router.patch('/v1/conceptopago/:id', async (req, res, next) => {
    try {
        const actualizado =
            await conceptopago.actualizarconceptopago(
                req.params.id,
                req.body
            );

        return respuesta.success(req, res, actualizado, 200);
    } catch (error) {
        next(error);
    }
});

// ======================================================
// CONSULTAS MÉDICAS
// ======================================================


// GET: obtener todas las consultas médicas
router.get('/v1/consultasmedicas', async (req, res, next) => {
    try {
        const datos =
            await consultasmedicas.obtenerconsultasmedicas();

        return respuesta.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
});


// POST: crear una nueva consulta médica
router.post('/v1/consultasmedicas', async (req, res, next) => {
    try {
        const creado =
            await consultasmedicas.crearconsultamedica(req.body);

        return respuesta.success(req, res, creado, 201);
    } catch (error) {
        next(error);
    }
});


// PATCH: modificar parcialmente una consulta médica
router.patch('/v1/consultasmedicas/:id', async (req, res, next) => {
    try {
        const actualizado =
            await consultasmedicas.actualizarconsultamedica(
                req.params.id,
                req.body
            );

        return respuesta.success(req, res, actualizado, 200);
    } catch (error) {
        next(error);
    }
});

// ======================================================
// CURSO - MAESTRO
// ======================================================


// GET: obtener todos los registros curso-maestro
router.get('/v1/cursomaestro', async (req, res, next) => {
    try {
        const datos =
            await cursomaestro.obtenercursomaestro();

        return respuesta.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
});


// POST: crear un registro curso-maestro
router.post('/v1/cursomaestro', async (req, res, next) => {
    try {
        const creado =
            await cursomaestro.crearcursomaestro(req.body);

        return respuesta.success(req, res, creado, 201);
    } catch (error) {
        next(error);
    }
});


// PATCH: actualizar parcialmente un registro curso-maestro
router.patch('/v1/cursomaestro/:id', async (req, res, next) => {
    try {
        const actualizado =
            await cursomaestro.actualizarcursomaestro(
                req.params.id,
                req.body
            );

        return respuesta.success(req, res, actualizado, 200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;