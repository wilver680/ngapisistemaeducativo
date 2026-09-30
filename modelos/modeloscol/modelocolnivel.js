class modelocolnivel {

    constructor(  
        pknivelid,
        pkcolegioid,
        descripcionnivel,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pknivelid = pknivelid;
        this.pkcolegioid = pkcolegioid;
        this.descripcionnivel = descripcionnivel;
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

        const nivel = new modelocolnivel(
            fila.pknivelid,
            fila.pkcolegioid,
            fila.descripcionnivel,
            fila.activo,
            fila.usuarioingresa,
            fila.usuariomodifica,
            fila.fechaingresa,
            fila.fechamodifica
        );

        // Este campo viene del JOIN con grcolegio.
        if (Object.hasOwn(fila, 'nombrecolegio')) {
            nivel.nombrecolegio =
                fila.nombrecolegio;
        }

        return nivel;
    }   


}

module.exports = modelocolnivel;