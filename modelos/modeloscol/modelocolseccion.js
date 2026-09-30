class modelocolseccion {

    constructor(
        pkseccionid,
        pkcolegioid,
        pkgradoid,
        descripcionseccion,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkseccionid = pkseccionid;
        this.pkcolegioid = pkcolegioid;
        this.pkgradoid = pkgradoid;
        this.descripcionseccion = descripcionseccion;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolseccion;