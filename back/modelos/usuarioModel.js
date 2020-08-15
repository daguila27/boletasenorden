const dbPool = require('../dbPool');


async function getCompanyFromAdmin(indata){
    //indata = {iduser: 1}
    //el iduser que se recibe debe ser el del administrador de la empresa en la plataforma
    try{
        const result = await dbPool.query("SELECT empresa.idEmpresa, empresa.idAdmin, empleadosQuery.num_empleados, COALESCE(rolQuery.idrol,'') AS idrol_concat, COALESCE(categoriaQuery.idcat,'') AS idcat_concat FROM empresa LEFT JOIN (\n" +
            "SELECT empresa.idEmpresa, count(*) AS num_empleados\n" +
            "FROM usuariorol \n" +
            "LEFT JOIN rol ON rol.idRol = usuariorol.idRol \n" +
            "LEFT JOIN empresa ON rol.idEmpresa = empresa.idEmpresa \n" +
            "GROUP BY empresa.idEmpresa\n" +
            ") AS empleadosQuery ON empleadosQuery.idEmpresa = empresa.idEmpresa \n" +
            "LEFT JOIN (select group_concat(rol.idRol) as idrol, rol.idEmpresa from rol GROUP BY rol.idEmpresa) AS rolQuery ON rolQuery.idEmpresa = empresa.idEmpresa \n" +
            "LEFT JOIN (select group_concat(categoria.idCategoria) as idcat, categoria.idEmpresa from categoria GROUP BY categoria.idEmpresa) AS categoriaQuery ON categoriaQuery.idEmpresa = empresa.idEmpresa\n" +
            "WHERE empresa.idAdmin = ?", [indata.iduser]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
}
