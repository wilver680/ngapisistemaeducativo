class modelogrestadopersona {

    constructor(
        pkestadopersonaid,
        descripcionestado,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
       this.pkestadopersonaid = pkestadopersonaid;
       this.descripcionestado = descripcionestado;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrestadopersona;