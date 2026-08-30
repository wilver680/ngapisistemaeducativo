class modelocolanioescolar {

    constructor(
        pkanioscolarid,
        pkcolegioid,
        anio,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkanioscolarid = pkanioscolarid;
        this.pkcolegioid = pkcolegioid;
        this.anio = anio;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolanioescolar;