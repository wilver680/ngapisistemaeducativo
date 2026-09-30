/*const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config);

function todos(tabla, campos, from, condiciones) {

    var query = '';

    query += 'SELECT ' + campos.join(', ') + from + tabla;

    if (condiciones) {
        query += ' WHERE ' + condiciones;
    }

    return query;
}

function uno(tabla, campos, from, id) {

    var query = '';

    query += 'SELECT ' + campos.join(', ') +
             from + tabla +
             ' WHERE id = $1';

    return {
        text: query,
        values: [id]
    };
}

function agregar(tabla, campos, valores) {

    var query = '';

    query += 'INSERT INTO ' + tabla + ' (';
    query += campos.join(', ');
    query += ') VALUES (';
    query += valores.map((v, i) => '$' + (i + 1)).join(', ');
    query += ')';

    return {
        text: query,
        values: valores
    };
}

function eliminar(tabla, id) {

    var query = '';

    query += 'DELETE FROM ' + tabla + ' WHERE id = $1';

    return {
        text: query,
        values: [id]
    };
}

function actualizar(tabla, id, campos, valores) {

    var query = '';

    query += 'UPDATE ' + tabla + ' SET ';

    query += campos
        .map((c, i) => c + ' = $' + (i + 1))
        .join(', ');

    query += ' WHERE id = $' + (valores.length + 1);

    return {
        text: query,
        values: [...valores, id]
    };
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    actualizar
};*/

const pool = require('./conexiondbpostgresql');

// Valida nombres simples de tablas y columnas.
// Estos nombres deben definirse en los servicios.
function identificador(nombre) {
    if (
        typeof nombre !== 'string' ||
        !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(nombre)
    ) {
        throw new Error('Nombre de tabla o columna no válido');
    }

    return `"${nombre}"`;
}

function validarDatos(campos, valores) {
    if (
        !Array.isArray(campos) ||
        !Array.isArray(valores) ||
        campos.length === 0 ||
        campos.length !== valores.length
    ) {
        throw new Error('Debe existir un valor por cada campo');
    }
}

// Para consultas específicas, como SELECT con JOIN.
async function consultar(sql, valores = []) {
    const resultado = await pool.query(sql, valores);
    return resultado.rows;
}

async function todos(tabla, campos = ['*']) {
    const columnas = campos
        .map(campo => campo === '*' ? '*' : identificador(campo))
        .join(', ');

    return consultar(`
        SELECT ${columnas}
        FROM ${identificador(tabla)}
    `);
}

async function uno(tabla, clavePrimaria, id) {
    const filas = await consultar(`
        SELECT *
        FROM ${identificador(tabla)}
        WHERE ${identificador(clavePrimaria)} = $1
    `, [id]);

    return filas[0] ?? null;
}

async function agregar(tabla, campos, valores) {
    validarDatos(campos, valores);

    const columnas = campos.map(identificador).join(', ');
    const parametros = valores
        .map((_, i) => `$${i + 1}`)
        .join(', ');

    const filas = await consultar(`
        INSERT INTO ${identificador(tabla)} (${columnas})
        VALUES (${parametros})
        RETURNING *
    `, valores);

    return filas[0];
}

async function eliminar(tabla, clavePrimaria, id) {
    const filas = await consultar(`
        DELETE FROM ${identificador(tabla)}
        WHERE ${identificador(clavePrimaria)} = $1
        RETURNING *
    `, [id]);

    return filas[0] ?? null;
}

async function actualizar(
    tabla,
    clavePrimaria,
    id,
    campos,
    valores
) {
    validarDatos(campos, valores);

    const asignaciones = campos
        .map((campo, i) => `${identificador(campo)} = $${i + 1}`)
        .join(', ');

    const filas = await consultar(`
        UPDATE ${identificador(tabla)}
        SET ${asignaciones}
        WHERE ${identificador(clavePrimaria)} = $${valores.length + 1}
        RETURNING *
    `, [...valores, id]);

    return filas[0] ?? null;
}

module.exports = {
    consultar,
    todos,
    uno,
    agregar,
    eliminar,
    actualizar
};