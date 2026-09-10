class modelocolestadoobligacion {

    constructor(
        pkestadoobligacionid,
        descripcionestado,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkestadoobligacionid = pkestadoobligacionid;
        this.descripcionestado = descripcionestado;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolestadoobligacion;