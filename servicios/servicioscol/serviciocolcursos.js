const db = require('../../basededatos/database');
const modelocolcurso = require('../../modelos/modeloscol/modelocolcurso');
const { crearError } = require('../../respuestas');

//obtener los colegios que existen
async function obtenercurso() {
    const query = `SELECT c.pkcursoid, c.pkcolegioid, g.nombrecolegio, c.codigocurso, c.descripcioncurso, c.activo, c.usuarioingresa, 
                    c.usuariomodifica, c.fechaingresa, c.fechamodifica 
                    FROM colcurso c 
                    INNER JOIN grcolegio g on c.pkcolegioid = g.pkcolegioid `;
    const filas = await db.consultar(query);
    return filas.map(fila => modelocolcurso.desdeFila(fila));
}


// para crear un nuevo curso
async function crearcurso(datos) {
    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const curso = new modelocolcurso(
        undefined, // ID automático
        datos.pkcolegioid,
        datos.codigocurso,
        datos.descripcioncurso,
        datos.activo,
        datos.usuarioingresa,
        datos.usuariomodifica ?? null,
        datos.fechaingresa,
        datos.fechamodifica ?? null
    );

    const campos = [
        'pkcolegioid',
        'codigocurso',
        'descripcioncurso',
        'activo',
        'usuarioingresa',
        'usuariomodifica',
        'fechamodifica'
    ];

    //fecha ingresa
    if (curso.fechaingresa != null) {
        campos.push('fechaingresa');
    }
    const valores = campos.map(campo => curso[campo]);

    const fila = await db.agregar('colcurso', campos, valores);

    return modelocolcurso.desdeFila(fila);
}


//actualizar datos de un curso
async function actualizarcurso(id, datos) {
    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const permitidos = [
        'pkcolegioid',
        'codigocurso',
        'descripcioncurso',
        'activo',
        'usuariomodifica',
    ];

    const campos = permitidos.filter(campo =>
        Object.hasOwn(datos, campo)
    );

    if (campos.length === 0) {
        throw crearError('No enviaste campos para actualizar', 400);
    }

    const curso = modelocolcurso.desdeFila(datos);
    const valores = campos.map(campo => curso[campo]);

    // La fecha de modificación la establece el servidor.
    campos.push('fechamodifica');
    valores.push(new Date());

    const fila = await db.actualizar(
        'colcurso',
        'pkcursoid',
        id,
        campos,
        valores
    );

    if (!fila) {
        throw crearError('Curso no encontrado', 404);
    }

    return modelocolcurso.desdeFila(fila);
}



module.exports = { obtenercurso, crearcurso, actualizarcurso};