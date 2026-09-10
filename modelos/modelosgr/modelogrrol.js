const { act } = require("react");

class modelogrrol {

    constructor(
        pkrolid,
        pkcolegioid,
        descripcionrol,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkrolid = pkrolid;
        this.pkcolegioid = pkcolegioid;
        this.descripcionrol = descripcionrol;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrrol;