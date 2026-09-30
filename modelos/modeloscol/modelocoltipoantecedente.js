class modelocoltipoantecedente {

    constructor(
        pktipoantecendeid,
        descripciontipo,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pktipoantecendeid = pktipoantecendeid;
        this.descripciontipo = descripciontipo;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocoltipoantecedente;