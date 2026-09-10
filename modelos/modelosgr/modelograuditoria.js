class modelograuditoria {

    constructor(
        pkauditoriaid,
        pkusuarioid,
        pkcolegioid,
        accion,
        tablaafectada,
        registroid,
        fecha, 
        detalle,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkauditoriaid = pkauditoriaid;
        this.pkusuarioid = pkusuarioid;
        this.pkcolegioid = pkcolegioid;
        this.accion = accion;
        this.tablaafectada = tablaafectada;
        this.registroid = registroid;
        this.fecha = fecha;
        this.detalle = detalle; 
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelograuditoria;