class modelogrestadousuario {

    constructor(
        pkestadousuarioid,
        descripcionestado,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkestadousuarioid = pkestadousuarioid;
        this.descripcionestado = descripcionestado;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrestadousuario;