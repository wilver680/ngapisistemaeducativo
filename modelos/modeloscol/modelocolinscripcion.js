class modelocolinscripcion {

    constructor(   
        pkinscripcionid,
        pkcolegioid,
        pkpersonaid,
        pkanioescolarid,
        pkjornadaid,
        pkseccionid,
        pkestadoinscripcion, 
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkinscripcionid= pkinscripcionid;
        this.pkcolegioid = pkcolegioid;
        this.pkpersonaid = pkpersonaid;
        this.pkanioescolarid= pkanioescolarid;
        this.pkjornadaid = pkjornadaid;
        this.pkseccionid = pkseccionid;
        this.pkseccionid = pkseccionid;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolinscripcion;