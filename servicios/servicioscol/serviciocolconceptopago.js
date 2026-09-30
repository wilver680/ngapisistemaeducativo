const db = require('../../basededatos/database');
const modelocolconceptopago =
    require('../../modelos/modeloscol/modelocolconceptopago');
const { crearError } = require('../../respuestas');


// obtener todos los conceptos de pago


async function obtenerconceptospago() {

    const query = `
        SELECT
            p.pkconceptopagoid,
            p.pkcolegioid,
            c.nombrecolegio,
            p.descripcionconceptopago,
            p.activo,
            p.usuarioingresa,
            p.usuariomodifica,
            p.fechaingresa,
            p.fechamodifica
        FROM colconceptopago p
        INNER JOIN grcolegio c
            ON p.pkcolegioid = c.pkcolegioid
        ORDER BY p.pkconceptopagoid
    `;

    const filas = await db.consultar(query);

    return filas.map(fila =>
        modelocolconceptopago.desdeFila(fila)
    );
}

// crear un concepto de pago


async function crearconceptopago(datos) {

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    if (datos.pkcolegioid == null) {
        throw crearError('El campo pkcolegioid es obligatorio', 400);
    }

    if (
        typeof datos.descripcionconceptopago !== 'string' ||
        datos.descripcionconceptopago.trim() === ''
    ) {
        throw crearError(
            'El campo descripcionconceptopago es obligatorio',
            400
        );
    }

    if (datos.descripcionconceptopago.trim().length > 200) {
        throw crearError(
            'La descripción del concepto de pago no puede superar 200 caracteres',
            400
        );
    }

    if (datos.usuarioingresa == null) {
        throw crearError('El campo usuarioingresa es obligatorio', 400);
    }

    if (
        datos.activo != null &&
        typeof datos.activo !== 'boolean'
    ) {
        throw crearError('El campo activo debe ser true o false', 400);
    }

    const queryInsertar = `
        INSERT INTO colconceptopago (
            pkcolegioid,
            descripcionconceptopago,
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
            CURRENT_TIMESTAMP,
            NULL
        )
        RETURNING pkconceptopagoid
    `;

    const valores = [
        datos.pkcolegioid,
        datos.descripcionconceptopago.trim(),
        datos.activo ?? true,
        datos.usuarioingresa,
        datos.usuariomodifica ?? null
    ];

    const filas = await db.consultar(queryInsertar, valores);
    const idCreado = filas[0].pkconceptopagoid;

    return obtenerconceptopagoporid(idCreado);
}



//actualizar parcialmente un concepto de pago


async function actualizarconceptopago(id, datos) {

    const pkconceptopagoid = Number(id);

    if (
        !Number.isInteger(pkconceptopagoid) ||
        pkconceptopagoid <= 0
    ) {
        throw crearError(
            'El identificador del concepto de pago no es válido',
            400
        );
    }

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        throw crearError('Debes enviar un objeto JSON', 400);
    }

    const permitidos = [
        'pkcolegioid',
        'descripcionconceptopago',
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

    if (
        Object.hasOwn(datos, 'pkcolegioid') &&
        datos.pkcolegioid == null
    ) {
        throw crearError('pkcolegioid no puede ser nulo', 400);
    }

    if (Object.hasOwn(datos, 'descripcionconceptopago')) {

        if (
            typeof datos.descripcionconceptopago !== 'string' ||
            datos.descripcionconceptopago.trim() === ''
        ) {
            throw crearError(
                'descripcionconceptopago no puede estar vacío',
                400
            );
        }

        if (datos.descripcionconceptopago.trim().length > 200) {
            throw crearError(
                'La descripción no puede superar 200 caracteres',
                400
            );
        }

        datos.descripcionconceptopago =
            datos.descripcionconceptopago.trim();
    }

    if (
        Object.hasOwn(datos, 'activo') &&
        typeof datos.activo !== 'boolean'
    ) {
        throw crearError('El campo activo debe ser true o false', 400);
    }

    if (
        Object.hasOwn(datos, 'usuariomodifica') &&
        datos.usuariomodifica == null
    ) {
        throw crearError('usuariomodifica no puede ser nulo', 400);
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

    // Se actualiza automáticamente la fecha de modificación
    asignaciones.push('fechamodifica = CURRENT_TIMESTAMP');

    valores.push(pkconceptopagoid);

    const posicionId = valores.length;

    const queryActualizar = `
        UPDATE colconceptopago
        SET ${asignaciones.join(', ')}
        WHERE pkconceptopagoid = $${posicionId}
        RETURNING pkconceptopagoid
    `;

    const filas = await db.consultar(queryActualizar, valores);

    if (filas.length === 0) {
        throw crearError(
            `No existe el concepto de pago con ID ${pkconceptopagoid}`,
            404
        );
    }

    return obtenerconceptopagoporid(pkconceptopagoid);
}

//obtener concepto de pago por ID


async function obtenerconceptopagoporid(id) {

    const query = `
        SELECT
            p.pkconceptopagoid,
            p.pkcolegioid,
            c.nombrecolegio,
            p.descripcionconceptopago,
            p.activo,
            p.usuarioingresa,
            p.usuariomodifica,
            p.fechaingresa,
            p.fechamodifica
        FROM colconceptopago p
        INNER JOIN grcolegio c
            ON p.pkcolegioid = c.pkcolegioid
        WHERE p.pkconceptopagoid = $1
    `;

    const filas = await db.consultar(query, [id]);

    if (filas.length === 0) {
        throw crearError(
            `No existe el concepto de pago con ID ${id}`,
            404
        );
    }

    return modelocolconceptopago.desdeFila(filas[0]);
}


module.exports = {
    obtenerconceptospago,
    crearconceptopago,
    actualizarconceptopago
};