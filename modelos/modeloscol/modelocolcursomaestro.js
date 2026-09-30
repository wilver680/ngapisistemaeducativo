class modelocolcursomaestro {

    constructor(
        pkcursomaestroid,
        pkcolegioid,
        pkasignacionmaestroid,
        pkgradocursoid,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica
    ) {
        this.pkcursomaestroid = pkcursomaestroid;
        this.pkcolegioid = pkcolegioid;
        this.pkasignacionmaestroid = pkasignacionmaestroid;
        this.pkgradocursoid = pkgradocursoid;
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

        const cursomaestro = new modelocolcursomaestro(
            fila.pkcursomaestroid,
            fila.pkcolegioid,
            fila.pkasignacionmaestroid,
            fila.pkgradocursoid,
            fila.activo,
            fila.usuarioingresa,
            fila.usuariomodifica,
            fila.fechaingresa,
            fila.fechamodifica
        );

        // Información adicional del colegio
        if (Object.hasOwn(fila, 'nombrecolegio')) {
            cursomaestro.nombrecolegio = fila.nombrecolegio;
        }

        // Estado de la asignación del maestro
        if (Object.hasOwn(fila, 'activoasignacionmaestro')) {
            cursomaestro.activoasignacionmaestro =
                fila.activoasignacionmaestro;
        }

        // Estado de la relación grado-curso
        if (Object.hasOwn(fila, 'activogradocurso')) {
            cursomaestro.activogradocurso =
                fila.activogradocurso;
        }

        return cursomaestro;
    }
}

module.exports = modelocolcursomaestro;