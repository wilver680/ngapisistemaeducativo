const { act } = require("react");

class modelogrmetodopago {

    constructor(
        pkmetodopagoid,
        pktipopagoid,
        descripcionmetodopago,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkmetodopagoid = pkmetodopagoid;
        this.pktipopagoid = pktipopagoid;
        this.descripcionmetodopago = descripcionmetodopago;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrmetodopago;