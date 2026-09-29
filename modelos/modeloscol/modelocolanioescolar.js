class modelocolanioescolar {

    constructor(
        pkanioscolarid,
        pkcolegioid,
        anio,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica
    ) {
        this.pkanioscolarid = pkanioscolarid;
        this.pkcolegioid = pkcolegioid;
        this.anio = anio;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

    static desdeFila(fila) {
        if (!fila) {
            return null;
        }

        const anioescolar = new modelocolanioescolar(
            fila.pkanioscolarid,
            fila.pkcolegioid,
            fila.anio,
            fila.activo,
            fila.usuarioingresa,
            fila.usuariomodifica,
            fila.fechaingresa,
            fila.fechamodifica
        );

        // Campos adicionales obtenidos mediante JOIN con grcolegio.
        if (Object.hasOwn(fila, 'nombrecolegio')) {
            anioescolar.nombrecolegio = fila.nombrecolegio;
        }

        if (Object.hasOwn(fila, 'direccion')) {
            anioescolar.direccion = fila.direccion;
        }

        if (Object.hasOwn(fila, 'pkestadocolegioid')) {
            anioescolar.pkestadocolegioid =
                fila.pkestadocolegioid;
        }

        return anioescolar;
    }
}

module.exports = modelocolanioescolar;