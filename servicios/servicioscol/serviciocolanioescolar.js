const db = require('../../basededatos/database');
const modelocolanioescolar = require('../../modelos/modeloscol/modelocolanioescolar');
const { crearError } = require('../../respuestas');

//obtener los anioescolar que existen
async function obteneranioescolar() {
    const query = `SELECT a.pkanioscolarid , a.pkcolegioid, c.nombrecolegio, c.direccion, c.pkestadocolegioid,
                    a.anio, a.activo, a.usuarioingresa, a.usuariomodifica, a.fechaingresa, a.fechamodifica 
                   FROM colanioescolar a
                   INNER JOIN grcolegio c on a.pkcolegioid = c.pkcolegioid `;
    const filas = await db.consultar(query);
    return filas.map(fila => modelocolanioescolar.desdeFila(fila));
}

// para crear un nuevo anioescolar
async function crearanioescolar(datos) {
    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const anioescolar = new modelocolanioescolar(
        undefined, // ID automático
        datos.pkcolegioid,
        datos.anio,
        datos.activo,
        datos.usuarioingresa,
        datos.usuariomodifica ?? null,
        datos.fechaingresa,
        datos.fechamodifica ?? null
    );

    const campos = [
        'pkcolegioid',
        'anio',
        'activo',
        'usuarioingresa',
        'usuariomodifica',
        'fechamodifica'
    ];

    //fecha ingresa
    if (anioescolar.fechaingresa != null) {
        campos.push('fechaingresa');
    }
    const valores = campos.map(campo => anioescolar[campo]);

    const fila = await db.agregar('colanioescolar', campos, valores);

    return modelocolanioescolar.desdeFila(fila);

}

//actualizar datos de un anioescolar
async function actualizaranioescolar(id, datos) {
    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const permitidos = [
        'pkcolegioid',
        'anio',
        'activo',
        'usuariomodifica',
    ];

    const campos = permitidos.filter(campo =>
        Object.hasOwn(datos, campo)
    );

    if (campos.length === 0) {
        throw crearError('No enviaste campos para actualizar', 400);
    }

    const anioescolar = modelocolanioescolar.desdeFila(datos);
    const valores = campos.map(campo => anioescolar[campo]);

    // La fecha de modificación la establece el servidor.
    campos.push('fechamodifica');
    valores.push(new Date());

    const fila = await db.actualizar(
        'colanioescolar',
        'pkanioscolarid',
        id,
        campos,
        valores
    );

    if (!fila) {
        throw crearError('Anio escolar no encontrado', 404);
    }

    return modelocolanioescolar.desdeFila(fila);
}



module.exports = { obteneranioescolar, crearanioescolar, actualizaranioescolar };
