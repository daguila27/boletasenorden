const dbPool = require('../dbPool');
var express = require('express');
var router = express.Router();

router.getCategories = async function (indata){
    // indata = {idcategories: [1,2,3]}
    try{
        const result = await dbPool.query("SELECT * FROM categoria WHERE idCategoria IN (?)", [indata.idcategories]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};


router.getCategoriesForUser = async function (indata){
    // indata = {iduser: 1, idrol: 3}
    try{
        const result = await dbPool.query("SELECT categoria.* FROM categoriapermitida \n" +
            "LEFT JOIN categoria ON categoria.idCategoria = categoriapermitida.idCategoria \n" +
            "LEFT JOIN rol ON rol.idRol = categoriapermitida.idRol \n" +
            "LEFT JOIN usuariorol ON usuariorol.idRol = categoriapermitida.idRol \n" +
            "WHERE usuariorol.idUsuario = ? AND usuariorol.idRol = ?", [indata.iduser, indata.idrol]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};

//controlador INSERT para tabla `Categoria`
router.save = async function (indata){
    //{idcompany: 1, name: 'SoyUnaCategoria'}
    try{
        const result = await dbPool.query("INSERT INTO Categoria (idEmpresa, nombre) VALUES (?)", [[indata.idcompany, indata.name]]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};






module.exports = router;
