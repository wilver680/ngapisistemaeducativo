const express = require('express');
const config = require('./config');

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

module.exports = app;