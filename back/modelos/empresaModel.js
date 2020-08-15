const dbPool = require('../dbPool');
var express = require('express');
var router = express.Router();

router.getCategories = async function (indata){
    //indata = {idcompany: [1,2,3]}
    try{
        const result = await dbPool.query("SELECT * FROM categoria WHERE idEmpresa IN (?) ", [indata.idcompany.join(',')]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};


router.getRoles = async function (indata){
    //indata = {idcompany: [1,2,3]}
    try{
        const result = await dbPool.query("SELECT * FROM rol WHERE idEmpresa IN (?) ", [indata.idcompany.join(',')]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};



router.getDataCompanyFromAdmin = async function (indata){
    //indata = {iduser: 1}
    //el iduser que se recibe debe ser el del administrador de la empresa en la plataforma
    try{
        const result = await dbPool.query("SELECT empresa.idEmpresa, empresa.idAdmin, empleadosQuery.num_empleados, COALESCE(rolQuery.idrol,'') AS idrol_concat, COALESCE(categoriaQuery.idcat,'') AS idcat_concat FROM empresa LEFT JOIN (\n" +
            "SELECT empresa.idEmpresa, count(*) AS num_empleados\n" +
            "FROM usuariorol \n" +
            "LEFT JOIN rol ON rol.idRol = usuariorol.idRol \n" +
            "LEFT JOIN empresa ON rol.idEmpresa = empresa.idEmpresa \n" +
            "GROUP BY empresa.idEmpresa \n" +
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
};


router.getEmployeeData = async function (indata){
    //indata = {idcompany: 1}
    //el iduser que se recibe debe ser el del administrador de la empresa en la plataforma
    try{
        const result = await dbPool.query("SELECT usuario.nombre, group_concat(rol.nombre) as rol, COALESCE(queryGasto.total_gastado,0) total, '01/01/2020' AS registro FROM usuariorol \n" +
            "LEFT JOIN rol ON rol.idrol = usuariorol.idrol \n" +
            "LEFT JOIN usuario ON usuario.idUsuario = usuariorol.idUsuario \n" +
            "LEFT JOIN (\n" +
            "SELECT gasto.idUsuario, sum(detallegasto.valor) AS total_gastado FROM gasto \n" +
            "LEFT JOIN detallegasto ON detallegasto.idGasto = gasto.idGasto \n" +
            "LEFT JOIN categoria ON gasto.idCategoria =categoria.idCategoria \n" +
            "WHERE categoria.idEmpresa = ? GROUP BY gasto.idUsuario\n" +
            ") AS queryGasto ON queryGasto.idUsuario = usuario.idUsuario  \n" +
            "WHERE rol.idEmpresa = ? GROUP BY usuariorol.idUsuario", [indata.idcompany, indata.idcompany]);

        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};

module.exports = router;