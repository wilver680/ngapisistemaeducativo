class modelocolverificacionantecedente {

    constructor(
        pkverificacionantecedenteid,
        pkcolegioid,
        pkpersonaid,
        pktipoantecedenteid,
        pkestadoantecedenteid,
        resultadoantecedente,
        fechaconsulta,
        referenciaexterna,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkverificacionantecedenteid = pkverificacionantecedenteid;
        this.pkcolegioid = pkcolegioid;
        this.pkpersonaid = pkpersonaid;
        this.pktipoantecedenteid= pktipoantecedenteid;
        this.pkestadoantecedenteid = pkestadoantecedenteid
        this.resultadoantecedente = resultadoantecedente;
        this.fechaconsulta = fechaconsulta;
        this.referenciaexterna = referenciaexterna;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelocolverificacionantecedente;