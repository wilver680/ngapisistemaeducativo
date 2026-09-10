const db = require('../../basededatos/database');
const modelocolnivel = require('../../modelos/modeloscol/modelocolnivel');
const { crearError } = require('../../respuestas');

//obtener los niveles de los grados que existen
async function obtenernivel() {
    const query = `SELECT n.pknivelid, n.pkcolegioid, c.nombrecolegio, n.descripcionnivel, n.activo, 
                  n.usuarioingresa, n.usuariomodifica, n.fechaingresa, n.fechamodifica 
                  FROM colnivel n 
                  INNER JOIN grcolegio c on n.pkcolegioid = c.pkcolegioid`;
    const filas = await db.consultar(query);
    return filas.map(fila => modelocolnivel.desdeFila(fila));
}



module.exports = { obtenernivel};