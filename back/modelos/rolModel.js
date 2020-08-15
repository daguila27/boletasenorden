const dbPool = require('../dbPool');
var express = require('express');
var router = express.Router();


router.getRoles =  async function (indata){
    try{
        const result = await dbPool.query("SELECT * FROM rol WHERE idRol IN (?)", [indata.idroles]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};


//controlador INSERT para tabla `Rol`
router.save = async function (indata){
    //{idcompany: 1, name: 'SoyUnaCategoria'}
    try{
        const result = await dbPool.query("INSERT INTO rol (idEmpresa, nombre) VALUES (?)", [[indata.idcompany, indata.name]]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};



module.exports = router;