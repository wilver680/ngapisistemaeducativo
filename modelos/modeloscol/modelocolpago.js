class modelocolpago {

    constructor(
        pkpagoid,
        pkcolegioid,
        pkobligacionid,
        pkmetodopagoid,
        pkpersonaidencargado,
        monto,
        pkestadopagoid,
        referenciaexterna,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkpagoid = pkpagoid;
        this.pkcolegioid = pkcolegioid;
        this.pkobligacionid = pkobligacionid;
        this.pkmetodopagoid = pkmetodopagoid;
        this.pkpersonaidencargado = pkpersonaidencargado;
        this.monto = monto;
        this.referenciaexterna = referenciaexterna;
        this.pkestadopagoid = pkestadopagoid;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolpago;