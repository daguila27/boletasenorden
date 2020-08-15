const dbPool = require('../dbPool');
var express = require('express');
var router = express.Router();


//controlador INSERT para tabla `Categoria`
router.save = async function (indata){
    //indata = {idcategoria: 1, idrol: 1}
    try{
        const result = await dbPool.query("INSERT INTO CategoriaPermitida (idCategoria, idRol) VALUES (?)", [[indata.idcategoria, indata.idrol]]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};






module.exports = router;
