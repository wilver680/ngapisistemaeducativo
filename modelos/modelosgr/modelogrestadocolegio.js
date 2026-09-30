class modelogrestadocolegio {

    constructor(
        pkestadocolegioid,
        descripcionestado,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkestadocolegioid = pkestadocolegioid;
        this.descripcionestado = descripcionestado;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrestadocolegio;