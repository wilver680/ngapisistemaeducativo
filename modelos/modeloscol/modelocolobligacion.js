class modelocolobligacion {

    constructor(
        pkobligacionid,
        pkcolegioid,
        pkpersonaid,
        pkconceptopagoid,
        pkinscripcionid,
        pkestadoobligacionid,
        descripcionobligacion,
        monto,
        fechavencimiento,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkobligacionid = pkobligacionid;
        this.pkcolegioid = pkcolegioid;
        this.pkpersonaid = pkpersonaid;
        this.pkconceptopagoid = pkconceptopagoid;
        this.pkinscripcionid = pkinscripcionid;
        this.pkestadoobligacionid = pkestadoobligacionid;
        this.descripcionobligacion = descripcionobligacion;
        this.monto = monto;
        this.fechavencimiento = fechavencimiento;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolobligacion;