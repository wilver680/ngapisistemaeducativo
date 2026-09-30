const { act } = require("react");

class modelogrpersonacol {

    constructor(
        pkpersonaid,
        pkpersonaciudadanoid,
        pkcolegioid,
        pkestadopersonaid,
        correopersona,
        telefono,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkpersonaid = pkpersonaid;
        this.pkpersonaciudadanoid = pkpersonaciudadanoid;
        this.pkcolegioid = pkcolegioid;
        this.pkestadopersonaid = pkestadopersonaid;
        this.correopersona = correopersona;
        this.telefono = telefono;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrpersonacol;