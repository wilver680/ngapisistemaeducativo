class modelosegrolusuario {

    constructor(
        pkrolusuarioid,
        pkcolegioid,
        pkusuarioid,
        pkrolid,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica
    
    ) {
        this.pkrolusuarioid= pkrolusuarioid;
        this.pkcolegioid = pkcolegioid;
        this.pkusuarioid = pkusuarioid;
        this.pkrolid = pkrolid;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelosegrolusuario;