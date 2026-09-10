const { act } = require("react");

class modelogrparentesco {

    constructor(
        pkparentescoid,
        descripcionparentesco,
        activo,
        usuarioingresa,
        usuariomodifica,
        fechaingresa,
        fechamodifica

    ) {
        this.pkparentescoid = pkparentescoid;
        this.descripcionparentesco = descripcionparentesco;
        this.activo = activo;
        this.usuarioingresa = usuarioingresa;
        this.usuariomodifica = usuariomodifica;
        this.fechaingresa = fechaingresa;
        this.fechamodifica = fechamodifica;
    }

}

module.exports = modelogrparentesco;