class modeloconsultasmedicas {

    constructor(
        pkconsultamedicaid,
        pkcolegioid,
        descripcionconsultamedica,
        fechaconsulta,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkconsultamedicaid = pkconsultamedicaid;
        this.pkcolegioid = pkcolegioid;
        this.descripcionconsultamedica = descripcionconsultamedica;
        this.fechaconsulta = fechaconsulta;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modeloconsultasmedicas;