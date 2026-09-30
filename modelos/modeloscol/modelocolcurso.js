class modelocolcurso {

    constructor(
        pkcursoid,
        pkcolegioid,
        codigocurso,
        descripcioncurso,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkcursoid = pkcursoid;
        this.pkcolegioid = pkcolegioid;
        this.codigocurso = codigocurso;
        this.descripcioncurso = descripcioncurso;
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

        const curso = new modelocolcurso(
            fila.pkcursoid,
            fila.pkcolegioid,
            fila.codigocurso,
            fila.descripcioncurso,
            fila.activo,
            fila.nombrecolegio,
            fila.usuarioingresa,
            fila.usuariomodifica,
            fila.fechaingresa,
            fila.fechamodifica
        );

        // Este campo viene del JOIN con grcolegio.
        if (Object.hasOwn(fila, 'nombrecolegio')) {
            curso.nombrecolegio =
                fila.nombrecolegio;
        }

        return curso;
    }   

}

module.exports = modelocolcurso;