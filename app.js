const express = require('express');
const config = require('./config');
const respuesta = require('./respuestas');

const app = express();

// Configuración
app.set('port', config.app.port);

// Middleware
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando correctamente'
    });
});

// Conecta las URLs definidas en routes.js.
app.use('/api', require('./routes'));

// Manejo centralizado de errores.
app.use(respuesta.rutaNoEncontrada);
app.use(respuesta.manejarError);

module.exports = app;