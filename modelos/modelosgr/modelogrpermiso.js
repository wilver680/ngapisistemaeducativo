const { act } = require("react");

class modelogrpermiso {

    constructor(
        pkpermisoid,
        pkmoduloid,
        descripcionpermiso,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkpermisoid = pkpermisoid;
        this.pkmoduloid =pkmoduloid;
        this.descripcionpermiso = descripcionpermiso;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrpermiso;