class modelocoljornadas {

    constructor(  
        pkjornadaid,
        pkcolegioid,
        descripcionjornada,
        activo,   
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkjornadaid = pkjornadaid;
        this.pkcolegioid = pkcolegioid;
        this.descripcionjornada = descripcionjornada;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocoljornadas;