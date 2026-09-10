/*exports.success = function (req, res, mensaje, status) {
    const statusCode = status || 200;
    const mensajeOk = mensaje || '';
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: mensajeOk
    });
}

exports.error = function (req, res, mensaje, status) {
    const statusCode = status || 500;
    const mensajeError = mensaje || 'Error Interno';
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: mensajeError
    });
}*/

function success(req, res, mensaje = '', status = 200) {
    return res.status(status).json({
        error: false,
        status,
        body: mensaje
    });
}

function error(req, res, mensaje = 'Error interno', status = 500) {
    return res.status(status).json({
        error: true,
        status,
        body: mensaje
    });
}

// Permite crear errores conocidos desde los servicios.
function crearError(mensaje, status = 400) {
    const err = new Error(mensaje);
    err.status = status;
    err.publico = true;
    return err;
}

function manejarError(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    let status = 500;
    let mensaje = 'Error interno del servidor';

    if (err.type === 'entity.parse.failed') {
        status = 400;
        mensaje = 'El JSON enviado no es válido';
    } else if (err.type === 'entity.too.large') {
        status = 413;
        mensaje = 'La solicitud supera el tamaño permitido';
    } else if (
        err.publico === true &&
        Number.isInteger(err.status) &&
        err.status >= 400 &&
        err.status < 500
    ) {
        status = err.status;
        mensaje = err.message;
    } else {
        // Errores conocidos de PostgreSQL.
        switch (err.code) {
            case '23505':
                status = 409;
                mensaje = 'Ya existe un registro con esos datos';
                break;

            case '23503':
                status = 409;
                mensaje = 'La operación entra en conflicto con registros relacionados';
                break;

            case '23502':
                status = 400;
                mensaje = 'Falta un dato obligatorio';
                break;

            case '23514':
                status = 400;
                mensaje = 'Los datos no cumplen las restricciones permitidas';
                break;

            case '22001':
                status = 400;
                mensaje = 'Un texto supera la longitud permitida';
                break;

            case '22P02':
                status = 400;
                mensaje = 'Un dato tiene un formato incompatible con su tipo';
                break;

            case '22003':
                status = 400;
                mensaje = 'Un número está fuera del rango permitido';
                break;

            case '22007':
            case '22008':
                status = 400;
                mensaje = 'Una fecha tiene un formato o valor inválido';
                break;
        }
    }

    // No enviar consultas, credenciales ni detalles internos al cliente.
    console.error('Error en la API:', {
        metodo: req.method,
        codigo: err.code || err.type || err.name,
        status
    });

    return error(req, res, mensaje, status);
}

function rutaNoEncontrada(req, res) {
    return error(req, res, 'Ruta no encontrada', 404);
}

module.exports = {
    success,
    error,
    crearError,
    manejarError,
    rutaNoEncontrada
};