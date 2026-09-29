class modelocolconceptopago {

    constructor(
        pkconceptopagoid,
        pkcolegioid,
        descripcionconceptopago,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica
    ) {
        this.pkconceptopagoid = pkconceptopagoid;
        this.pkcolegioid = pkcolegioid;
        this.descripcionconceptopago = descripcionconceptopago;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

    static desdeFila(fila) {

        if (!fila) {
            return null;
        }

        const conceptopago = new modelocolconceptopago(
            fila.pkconceptopagoid,
            fila.pkcolegioid,
            fila.descripcionconceptopago,
            fila.activo,
            fila.usuarioingresa,
            fila.usuariomodifica,
            fila.fechaingresa,
            fila.fechamodifica
        );

        // Información adicional obtenida de grcolegio
        if (Object.hasOwn(fila, 'nombrecolegio')) {
            conceptopago.nombrecolegio = fila.nombrecolegio;
        }

        return conceptopago;
    }
}

module.exports = modelocolconceptopago;