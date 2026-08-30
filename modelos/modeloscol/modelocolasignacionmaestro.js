const { act } = require("react");

class modelocolasignacionmaestro {

    constructor(
        pkasignacionmaestroid,
        pkcolegioid,
        pkpersonaid,
        pkgradoid,
        pkseccionid,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkasignacionmaestroid = pkasignacionmaestroid;
        this.pkcolegioid = pkcolegioid;
        this.pkpersonaid = pkpersonaid;
        this.pkgradoid = pkgradoid;
        this.pkseccionid = pkseccionid;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolasignacionmaestro;