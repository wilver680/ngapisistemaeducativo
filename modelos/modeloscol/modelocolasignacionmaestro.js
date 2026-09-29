class modelocolasignacionmaestro {

    constructor(
        pkasignacionmaestroid,
        pkcolegioid,
        pkpersonaid,
        pkgradoid,
        pkseccionid,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica
    ) {
        this.pkasignacionmaestroid = pkasignacionmaestroid;
        this.pkcolegioid = pkcolegioid;
        this.pkpersonaid = pkpersonaid;
        this.pkgradoid = pkgradoid;
        this.pkseccionid = pkseccionid;
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

        const asignacionmaestro = new modelocolasignacionmaestro(
            fila.pkasignacionmaestroid,
            fila.pkcolegioid,
            fila.pkpersonaid,
            fila.pkgradoid,
            fila.pkseccionid,
            fila.estadomaestro,
            fila.usuarioingresa,
            fila.usuariomodifica,
            fila.fechaingresa,
            fila.fechamodifica
        );

        // Información del colegio
        if (Object.hasOwn(fila, 'nombrecolegio')) {
            asignacionmaestro.nombrecolegio =
                fila.nombrecolegio;
        }

        if (Object.hasOwn(fila, 'pkestadocolegioid')) {
            asignacionmaestro.pkestadocolegioid =
                fila.pkestadocolegioid;
        }

        // Información del grado
        if (Object.hasOwn(fila, 'descripciongrado')) {
            asignacionmaestro.descripciongrado =
                fila.descripciongrado;
        }

        if (Object.hasOwn(fila, 'estadogrado')) {
            asignacionmaestro.estadogrado =
                fila.estadogrado;
        }

        // Información de la sección
        if (Object.hasOwn(fila, 'descripcionseccion')) {
            asignacionmaestro.descripcionseccion =
                fila.descripcionseccion;
        }

        if (Object.hasOwn(fila, 'estadoseccion')) {
            asignacionmaestro.estadoseccion =
                fila.estadoseccion;
        }

        return asignacionmaestro;
    }
}

module.exports = modelocolasignacionmaestro;