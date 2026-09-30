const { act } = require("react");

class modelogrmodulo {

    constructor(
        pkmoduloid,
        pkcolegioid,
        descripcionmodulo,
        iconomodulo,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkmoduloid = pkmoduloid;
        this.pkcolegioid = pkcolegioid;
        this.descripcionmodulo = descripcionmodulo;
        this.iconomodulo = iconomodulo;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrmodulo;