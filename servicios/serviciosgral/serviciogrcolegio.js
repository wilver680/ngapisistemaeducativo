const db = require('../../basededatos/database');
const modelogrcolegio = require('../../modelos/modelosgr/modelogrcolegio');
const { crearError } = require('../../respuestas');

//obtener los colegios que existen
async function obtenercolegios() {
    const query = `SELECT  c.pkcolegioid, c.nombrecolegio, c.direccion, c.correocolegio, 
        c.telefonocolegio, c.pkestadocolegioid, e.descripcionestado AS descripcionestadocolegio,  
        c.usuarioingresa,  c.usuariomodifica,  c.fechaingresa,  c.fechamodifica 
        FROM grcolegio c
        JOIN grestadocolegio e
        ON c.pkestadocolegioid = e.pkestadocolegioid `;
    const filas = await db.consultar(query);
    return filas.map(fila => modelogrcolegio.desdeFila(fila));
}


// para crear un nuevo colegio
async function crearcolegio(datos) {
    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const colegio = new modelogrcolegio(
        undefined, // ID automático
        datos.nombrecolegio,
        datos.direccion ?? null,
        datos.correocolegio ?? null,
        datos.telefonocolegio ?? null,
        datos.pkestadocolegioid,
        datos.usuarioingresa,
        datos.usuariomodifica ?? null,
        datos.fechaingresa,
        datos.fechamodifica ?? null
    );

    const campos = [
        'nombrecolegio',
        'direccion',
        'correocolegio',
        'telefonocolegio',
        'pkestadocolegioid',
        'usuarioingresa',
        'usuariomodifica',
        'fechamodifica'
    ];

    //fecha ingresa
    if (colegio.fechaingresa != null) {
        campos.push('fechaingresa');
    }
    const valores = campos.map(campo => colegio[campo]);

    const fila = await db.agregar('grcolegio', campos, valores);

    return modelogrcolegio.desdeFila(fila);
}


//actualizar datos de colegio
async function actualizarcolegio(id, datos) {
    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const permitidos = [
        'nombrecolegio',
        'direccion',
        'correocolegio',
        'telefonocolegio',
        'pkestadocolegioid',
        'usuariomodifica'
    ];

    const campos = permitidos.filter(campo =>
        Object.hasOwn(datos, campo)
    );

    if (campos.length === 0) {
        throw crearError('No enviaste campos para actualizar', 400);
    }

    const colegio = modelogrcolegio.desdeFila(datos);
    const valores = campos.map(campo => colegio[campo]);

    // La fecha de modificación la establece el servidor.
    campos.push('fechamodifica');
    valores.push(new Date());

    const fila = await db.actualizar(
        'grcolegio',
        'pkcolegioid',
        id,
        campos,
        valores
    );

    if (!fila) {
        throw crearError('Colegio no encontrado', 404);
    }

    return modelogrcolegio.desdeFila(fila);
}


module.exports = { obtenercolegios, crearcolegio, actualizarcolegio};

