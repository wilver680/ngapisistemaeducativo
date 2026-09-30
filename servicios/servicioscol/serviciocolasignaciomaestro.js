const db = require('../../basededatos/database');
const modelocolasignacionmaestro = require('../../modelos/modeloscol/modelocolasignacionmaestro');
const { crearError } = require('../../respuestas');


// Obtener las asignaciones de maestros que existen
async function obtenerasignacionmaestro() {

    const query = ` SELECT a.pkasignacionmaestroid, a.pkcolegioid, c.nombrecolegio, c.pkestadocolegioid,  a.pkpersonaid,
                 a.pkgradoid, g.descripciongrado, g.activo AS estadogrado, a.pkseccionid, s.descripcionseccion,
                 s.activo AS estadoseccion, a.activo AS estadomaestro,  a.usuarioingresa,  a.usuariomodifica,
                 a.fechaingresa, a.fechamodifica
                 FROM colasignacionmaestro a
                 INNER JOIN grcolegio c  ON a.pkcolegioid = c.pkcolegioid
                 INNER JOIN grpersonacol p ON a.pkpersonaid = p.pkpersonaid
                 INNER JOIN colgrado g ON a.pkgradoid = g.pkgradoid
                 INNER JOIN colseccion s ON a.pkseccionid = s.pkseccionid
    `;

    const filas = await db.consultar(query);

    return filas.map(fila =>
        modelocolasignacionmaestro.desdeFila(fila)
    );
}


// Para crear una nueva asignación de maestro
async function crearasignacionmaestro(datos) {

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const asignacionmaestro = new modelocolasignacionmaestro(
        undefined, // ID automático
        datos.pkcolegioid,
        datos.pkpersonaid,
        datos.pkgradoid,
        datos.pkseccionid,
        datos.activo,
        datos.usuarioingresa,
        datos.usuariomodifica ?? null,
        datos.fechaingresa,
        datos.fechamodifica ?? null
    );

    const campos = [
        'pkcolegioid',
        'pkpersonaid',
        'pkgradoid',
        'pkseccionid',
        'activo',
        'usuarioingresa',
        'usuariomodifica',
        'fechamodifica'
    ];

    // Fecha de ingreso opcional
    if (asignacionmaestro.fechaingresa != null) {
        campos.push('fechaingresa');
    }

    const valores = campos.map(
        campo => asignacionmaestro[campo]
    );

    const fila = await db.agregar(
        'colasignacionmaestro',
        campos,
        valores
    );

    return modelocolasignacionmaestro.desdeFila(fila);
}

// Actualizar datos de una asignación de maestro
async function actualizarasignacionmaestro(id, datos) {

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const permitidos = [
        'pkcolegioid',
        'pkpersonaid',
        'pkgradoid',
        'pkseccionid',
        'activo',
        'usuariomodifica'
    ];

    const campos = permitidos.filter(campo =>
        Object.hasOwn(datos, campo)
    );

    if (campos.length === 0) {
        throw crearError(
            'No enviaste campos para actualizar',
            400
        );
    }

    // Tomar directamente los valores enviados
    const valores = campos.map(campo => datos[campo]);

    campos.push('fechamodifica');
    valores.push(new Date());

    const fila = await db.actualizar(
        'colasignacionmaestro',
        'pkasignacionmaestroid',
        id,
        campos,
        valores
    );

    if (!fila) {
        throw crearError(
            'Asignación de maestro no encontrada',
            404
        );
    }

    return modelocolasignacionmaestro.desdeFila(fila);
}
module.exports = { obtenerasignacionmaestro, crearasignacionmaestro, actualizarasignacionmaestro };