class modelosegusuario {

    constructor(
        pkusuarioid,
        pkcolegioid,
        pkpersonaid,
        pkestadousuarioid,
        usuario,
        contrasenia,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica
    
    ) {
        this.pkusuarioid = pkusuarioid;
        this.pkcolegioid = pkcolegioid;
        this.pkpersonaid = pkpersonaid;
        this.pkestadousuarioid = pkestadousuarioid;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelosegusuario;