class modelocolcurso {

    constructor(
        pkcursoid,
        pkcolegioid,
        codigocurso,
        descripcioncurso,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkcursoid = pkcursoid;
        this.pkcolegioid = pkcolegioid;
        this.codigocurso = codigocurso;
        this.descripcioncurso = descripcioncurso;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolcurso;