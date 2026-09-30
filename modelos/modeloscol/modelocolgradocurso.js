class modelocolgradocurso {

    constructor(  
        pkgradocursoid,
        pkcolegioid,
        pkgradoid,
        pkcursoid,
        activo,   
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkgradocursoid = pkgradocursoid,
        this.pkcolegioid = pkcolegioid;
        this.pkgradoid = pkgradoid;
        this.pkcursoid = pkcursoid;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolgradocurso;