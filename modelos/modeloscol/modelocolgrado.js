class modelocolgrado {

    constructor(
        pkgradoid,
        pkcolegioid,
        pknivelid,
        descripciongrado,
        activo,      
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkgradoid = pkgradoid;
        this.pkcolegioid = pkcolegioid;
        this.pknivelid = pknivelid;
        this.descripciongrado = descripciongrado;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolgrado;