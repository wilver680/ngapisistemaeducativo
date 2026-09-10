class modelocolestadopago {

    constructor(
        pkestadopagoid,
        descripcionestado,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkestadopagoid = pkestadopagoid;
        this.descripcionestado = descripcionestado;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolestadopago;