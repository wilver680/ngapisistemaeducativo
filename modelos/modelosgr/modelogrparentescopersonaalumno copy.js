class modelogrparentescpersonaalumno {

    constructor(
        pkparentescopersonaalumno,
        pkcolegioid,
        pkpersonaalumnoid,
        pkpersonaencargadoid,
        pkparentescoid,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this,pkparentescopersonaalumno = pkparentescopersonaalumno;
        this.pkcolegioid = pkcolegioid;
        this.pkpersonaalumnoid = pkpersonaalumnoid;
        this.pkpersonaencargadoid = pkpersonaencargadoid;
        this.pkparentescoid = pkparentescoid;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrparentescpersonaalumno;