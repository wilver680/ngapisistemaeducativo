class modelogrcolegio {

    constructor(
        pkcolegioid,
        nombrecolegio,
        direccion,
        correocolegio,
        telefonocolegio,
        pkestadocolegioid,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkcolegioid = pkcolegioid;
        this.nombrecolegio = nombrecolegio;
        this.direccion = direccion;
        this.correocolegio = correocolegio;
        this.telefonocolegio = telefonocolegio;
        this.pkestadocolegioid = pkestadocolegioid;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }
      static desdeFila(fila) {
        if (!fila) {
            return null;
        }

        const colegio = new modelogrcolegio(
            fila.pkcolegioid,
            fila.nombrecolegio,
            fila.direccion,
            fila.correocolegio,
            fila.telefonocolegio,
            fila.pkestadocolegioid,
            fila.usuarioingresa,
            fila.usuariomodifica,
            fila.fechaingresa,
            fila.fechamodifica
        );

        // Este campo viene del JOIN con grestadocolegio.
        if (Object.hasOwn(fila, 'descripcionestadocolegio')) {
            colegio.descripcionestadocolegio =
                fila.descripcionestadocolegio;
        }

        return colegio;
    }   

}

module.exports = modelogrcolegio;