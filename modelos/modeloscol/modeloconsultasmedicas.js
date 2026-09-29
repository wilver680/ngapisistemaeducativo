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

    static desdeFila(fila) {

        if (!fila) {
            return null;
        }

        const consultamedica = new modeloconsultasmedicas(
            fila.pkconsultamedicaid,
            fila.pkcolegioid,
            fila.descripcionconsultamedica,
            fila.fechaconsulta,
            fila.usuarioingresa,
            fila.usuariomodifica,
            fila.fechaingresa,
            fila.fechamodifica
        );

        // Información adicional obtenida de grcolegio
        if (Object.hasOwn(fila, 'nombrecolegio')) {
            consultamedica.nombrecolegio = fila.nombrecolegio;
        }

        return consultamedica;
    }
}

module.exports = modeloconsultasmedicas;