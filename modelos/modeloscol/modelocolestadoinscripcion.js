class modelocolestadoinscripcion {

    constructor(
        pkestadoinscripcionid,
        descripcionestado,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkestadoinscripcionid = pkestadoinscripcionid;
        this.descripcionestado = descripcionestado;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolestadoinscripcion;