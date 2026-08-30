const { act } = require("react");

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

}

module.exports = modelocolconceptopago;