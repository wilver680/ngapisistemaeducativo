const db = require('../../basededatos/database');
const modelocolcursomaestro =
    require('../../modelos/modeloscol/modelocolcursomaestro');
const { crearError } = require('../../respuestas');



async function obtenercursomaestro() {

    const query = `
        SELECT
            c.pkcursomaestroid,
            c.pkcolegioid,
            col.nombrecolegio,
            c.pkasignacionmaestroid,
            a.activo AS activoasignacionmaestro,
            c.pkgradocursoid,
            g.activo AS activogradocurso,
            c.activo,
            c.usuarioingresa,
            c.usuariomodifica,
            c.fechaingresa,
            c.fechamodifica
        FROM colcursomaestro c
        INNER JOIN grcolegio col
            ON c.pkcolegioid = col.pkcolegioid
        INNER JOIN colasignacionmaestro a
            ON c.pkasignacionmaestroid = a.pkasignacionmaestroid
        INNER JOIN colgradocurso g
            ON c.pkgradocursoid = g.pkgradocursoid
        ORDER BY c.pkcursomaestroid
    `;

    const filas = await db.consultar(query);

    return filas.map(fila =>
        modelocolcursomaestro.desdeFila(fila)
    );
}


//maestro por id

async function obtenercursomaestroporid(id) {

    const pkcursomaestroid = Number(id);

    if (
        !Number.isInteger(pkcursomaestroid) ||
        pkcursomaestroid <= 0
    ) {
        throw crearError(
            'El identificador de curso-maestro no es válido',
            400
        );
    }

    const query = `
        SELECT
            c.pkcursomaestroid,
            c.pkcolegioid,
            col.nombrecolegio,
            c.pkasignacionmaestroid,
            a.activo AS activoasignacionmaestro,
            c.pkgradocursoid,
            g.activo AS activogradocurso,
            c.activo,
            c.usuarioingresa,
            c.usuariomodifica,
            c.fechaingresa,
            c.fechamodifica
        FROM colcursomaestro c
        INNER JOIN grcolegio col
            ON c.pkcolegioid = col.pkcolegioid
        INNER JOIN colasignacionmaestro a
            ON c.pkasignacionmaestroid = a.pkasignacionmaestroid
        INNER JOIN colgradocurso g
            ON c.pkgradocursoid = g.pkgradocursoid
        WHERE c.pkcursomaestroid = $1
    `;

    const filas = await db.consultar(
        query,
        [pkcursomaestroid]
    );

    if (filas.length === 0) {
        throw crearError(
            `No existe el registro curso-maestro con ID ${pkcursomaestroid}`,
            404
        );
    }

    return modelocolcursomaestro.desdeFila(filas[0]);
}



//crear una asignación curso-maestro


async function crearcursomaestro(datos) {

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    validarId(
        datos.pkcolegioid,
        'El campo pkcolegioid es obligatorio'
    );

    validarId(
        datos.pkasignacionmaestroid,
        'El campo pkasignacionmaestroid es obligatorio'
    );

    validarId(
        datos.pkgradocursoid,
        'El campo pkgradocursoid es obligatorio'
    );

    validarId(
        datos.usuarioingresa,
        'El campo usuarioingresa es obligatorio'
    );

    if (
        datos.activo != null &&
        typeof datos.activo !== 'boolean'
    ) {
        throw crearError(
            'El campo activo debe ser true o false',
            400
        );
    }

    const query = `
        INSERT INTO colcursomaestro (
            pkcolegioid,
            pkasignacionmaestroid,
            pkgradocursoid,
            activo,
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
            $5,
            NULL,
            CURRENT_TIMESTAMP,
            NULL
        )
        RETURNING pkcursomaestroid
    `;

    const valores = [
        Number(datos.pkcolegioid),
        Number(datos.pkasignacionmaestroid),
        Number(datos.pkgradocursoid),
        datos.activo ?? true,
        Number(datos.usuarioingresa)
    ];

    const filas = await db.consultar(query, valores);

    const pkcursomaestroid =
        filas[0].pkcursomaestroid;

    return obtenercursomaestroporid(pkcursomaestroid);
}


//actualizar parcialmente curso-maestro

async function actualizarcursomaestro(id, datos) {

    const pkcursomaestroid = Number(id);

    if (
        !Number.isInteger(pkcursomaestroid) ||
        pkcursomaestroid <= 0
    ) {
        throw crearError(
            'El identificador de curso-maestro no es válido',
            400
        );
    }

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const permitidos = [
        'pkcolegioid',
        'pkasignacionmaestroid',
        'pkgradocursoid',
        'activo',
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

    validarId(
        datos.usuariomodifica,
        'usuariomodifica debe ser un identificador válido'
    );

    const camposId = [
        'pkcolegioid',
        'pkasignacionmaestroid',
        'pkgradocursoid'
    ];

    for (const campo of camposId) {
        if (Object.hasOwn(datos, campo)) {
            validarId(
                datos[campo],
                `${campo} debe ser un identificador válido`
            );

            datos[campo] = Number(datos[campo]);
        }
    }

    if (
        Object.hasOwn(datos, 'activo') &&
        typeof datos.activo !== 'boolean'
    ) {
        throw crearError(
            'El campo activo debe ser true o false',
            400
        );
    }

    datos.usuariomodifica = Number(datos.usuariomodifica);

    const camposActualizar = camposRecibidos.filter(
        campo => permitidos.includes(campo)
    );

    const asignaciones = camposActualizar.map(
        (campo, indice) => `${campo} = $${indice + 1}`
    );

    const valores = camposActualizar.map(
        campo => datos[campo]
    );

    asignaciones.push('fechamodifica = CURRENT_TIMESTAMP');

    valores.push(pkcursomaestroid);

    const posicionId = valores.length;

    const query = `
        UPDATE colcursomaestro
        SET ${asignaciones.join(', ')}
        WHERE pkcursomaestroid = $${posicionId}
        RETURNING pkcursomaestroid
    `;

    const filas = await db.consultar(query, valores);

    if (filas.length === 0) {
        throw crearError(
            `No existe el registro curso-maestro con ID ${pkcursomaestroid}`,
            404
        );
    }

    return obtenercursomaestroporid(pkcursomaestroid);
}


// Validar identificadores numéricos


function validarId(valor, mensaje) {

    const numero = Number(valor);

    if (!Number.isInteger(numero) || numero <= 0) {
        throw crearError(mensaje, 400);
    }
}


module.exports = {
    obtenercursomaestro,
    obtenercursomaestroporid,
    crearcursomaestro,
    actualizarcursomaestro
};