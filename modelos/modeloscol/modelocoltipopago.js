class modelocoltipopago {

    constructor(pktipopagoid,
        descripciontipopago,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pktipopagoid = pktipopagoid;
        this.descripciontipopago = descripciontipopago;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocoltipopago;