const db = require('../../basededatos/database');
const modeloconsultasmedicas = require('../../modelos/modeloscol/modeloconsultasmedicas');
const { crearError } = require('../../respuestas');

// GET: obtener todas las consultas médicas

async function obtenerconsultasmedicas() {

    const query = `
        SELECT
            m.pkconsultamedicaid,
            m.pkcolegioid,
            c.nombrecolegio,
            m.descripcionconsultamedica,
            m.fechaconsulta,
            m.usuarioingresa,
            m.usuariomodifica,
            m.fechaingresa,
            m.fechamodifica
        FROM colconsultasmedicas m
        INNER JOIN grcolegio c
            ON m.pkcolegioid = c.pkcolegioid
        ORDER BY m.pkconsultamedicaid
    `;

    const filas = await db.consultar(query);

    return filas.map(fila =>
        modeloconsultasmedicas.desdeFila(fila)
    );
}



//obtener consulta médica por ID


async function obtenerconsultamedicaporid(id) {

    const query = `
        SELECT
            m.pkconsultamedicaid,
            m.pkcolegioid,
            c.nombrecolegio,
            m.descripcionconsultamedica,
            m.fechaconsulta,
            m.usuarioingresa,
            m.usuariomodifica,
            m.fechaingresa,
            m.fechamodifica
        FROM colconsultasmedicas m
        INNER JOIN grcolegio c
            ON m.pkcolegioid = c.pkcolegioid
        WHERE m.pkconsultamedicaid = $1
    `;

    const filas = await db.consultar(query, [id]);

    if (filas.length === 0) {
        throw crearError(
            `No existe la consulta médica con ID ${id}`,
            404
        );
    }

    return modeloconsultasmedicas.desdeFila(filas[0]);
}


//crear una consulta médica

async function crearconsultamedica(datos) {

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    if (datos.pkcolegioid == null) {
        throw crearError(
            'El campo pkcolegioid es obligatorio',
            400
        );
    }

    if (
        typeof datos.descripcionconsultamedica !== 'string' ||
        datos.descripcionconsultamedica.trim() === ''
    ) {
        throw crearError(
            'El campo descripcionconsultamedica es obligatorio',
            400
        );
    }

    if (datos.descripcionconsultamedica.trim().length > 100) {
        throw crearError(
            'descripcionconsultamedica no puede superar 100 caracteres',
            400
        );
    }

    if (datos.usuarioingresa == null) {
        throw crearError(
            'El campo usuarioingresa es obligatorio',
            400
        );
    }

    const query = `
        INSERT INTO colconsultasmedicas (
            pkcolegioid,
            descripcionconsultamedica,
            fechaconsulta,
            usuarioingresa,
            usuariomodifica,
            fechaingresa,
            fechamodifica
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            NULL,
            CURRENT_TIMESTAMP,
            NULL
        )
        RETURNING pkconsultamedicaid
    `;

    const valores = [
        datos.pkcolegioid,
        datos.descripcionconsultamedica.trim(),
        datos.fechaconsulta ?? null,
        datos.usuarioingresa
    ];

    const filas = await db.consultar(query, valores);

    const pkconsultamedicaid =
        filas[0].pkconsultamedicaid;

    return obtenerconsultamedicaporid(pkconsultamedicaid);
}



//actualizar parcialmente una consulta médica


async function actualizarconsultamedica(id, datos) {

    const pkconsultamedicaid = Number(id);

    if (
        !Number.isInteger(pkconsultamedicaid) ||
        pkconsultamedicaid <= 0
    ) {
        throw crearError(
            'El identificador de la consulta médica no es válido',
            400
        );
    }

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const permitidos = [
        'pkcolegioid',
        'descripcionconsultamedica',
        'fechaconsulta',
        'usuariomodifica'
    ];

    const camposRecibidos = Object.keys(datos);

    if (camposRecibidos.length === 0) {
        throw crearError(
            'Debes enviar al menos un campo para actualizar',
            400
        );
    }

    const camposNoPermitidos = camposRecibidos.filter(
        campo => !permitidos.includes(campo)
    );

    if (camposNoPermitidos.length > 0) {
        throw crearError(
            `Campos no permitidos: ${camposNoPermitidos.join(', ')}`,
            400
        );
    }

    if (datos.usuariomodifica == null) {
        throw crearError(
            'El campo usuariomodifica es obligatorio',
            400
        );
    }

    if (
        Object.hasOwn(datos, 'pkcolegioid') &&
        datos.pkcolegioid == null
    ) {
        throw crearError(
            'pkcolegioid no puede ser nulo',
            400
        );
    }

    if (Object.hasOwn(datos, 'descripcionconsultamedica')) {

        if (
            typeof datos.descripcionconsultamedica !== 'string' ||
            datos.descripcionconsultamedica.trim() === ''
        ) {
            throw crearError(
                'descripcionconsultamedica no puede estar vacía',
                400
            );
        }

        if (datos.descripcionconsultamedica.trim().length > 100) {
            throw crearError(
                'descripcionconsultamedica no puede superar 100 caracteres',
                400
            );
        }

        datos.descripcionconsultamedica =
            datos.descripcionconsultamedica.trim();
    }

    const camposActualizar = camposRecibidos.filter(
        campo => permitidos.includes(campo)
    );

    const asignaciones = camposActualizar.map(
        (campo, indice) => `${campo} = $${indice + 1}`
    );

    const valores = camposActualizar.map(
        campo => datos[campo]
    );

    // La fecha de modificación se genera automáticamente
    asignaciones.push('fechamodifica = CURRENT_TIMESTAMP');

    // El ID será el último parámetro
    valores.push(pkconsultamedicaid);

    const posicionId = valores.length;

    const query = `
        UPDATE colconsultasmedicas
        SET ${asignaciones.join(', ')}
        WHERE pkconsultamedicaid = $${posicionId}
        RETURNING pkconsultamedicaid
    `;

    const filas = await db.consultar(query, valores);

    if (filas.length === 0) {
        throw crearError(
            `No existe la consulta médica con ID ${pkconsultamedicaid}`,
            404
        );
    }

    return obtenerconsultamedicaporid(pkconsultamedicaid);
}


module.exports = {
    obtenerconsultasmedicas,
    obtenerconsultamedicaporid,
    crearconsultamedica,
    actualizarconsultamedica
};