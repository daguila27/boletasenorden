var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const axios = require('axios');
var dbPool = require('../dbPool');
var modeloRol = require('../modelos/rolModel');
var modeloCategoriaPermitida = require('../modelos/categoriaPermitidaModel');

router.post('/addRole', async function (req, res) {
    //RECIBE EL NOMBRE DE LA EMPRESA;
    //Datos de Rol
    // Categorias Asociadas
    const indata = {
            name: req.body.nombre,
            idcompany: req.body.idcompany,
            idcategories: req.body.idcategories
        };

    const insertRolResult = await modeloRol.save({name: indata.name, idcompany: indata.idcompany});

    indata.idcategories = indata.idcategories.split(',');
    if(!insertRolResult.err){
        let resultArray = await Promise.all(
            indata.idcategories.map(async (item) => {
                return modeloCategoriaPermitida.save({idrol: insertRolResult.response.insertId, idcategoria: item});
            })
        );
        resultArray.filter((item) => {return item.err});
        if(resultArray.length > 0){res.send({msg: "¡Registro de Categoria exitoso!", err: false});}
        else{res.send({msg: "¡Registro de Categoria exitoso!", err: false});}
    }else{
        res.send({msg: "¡Error al registrar la Categoria!", err: true});
    }
});
router.post('/deleteRole', function (req, res) {
    //RECIBE EL NOMBRE DE LA EMPRESA;
    var indata = {idRol: 1};
    dbPool.query("DELETE FROM Rol WHERE idRol=?", [indata.idRol], function(err, data){
        if(err){
            console.log("Error Inserting : %s", err);
        }

    });
});
router.post('/editRol', function (req, res) {
    dbPool.query("UPDATE Rol SET ?", [indata], function(err, data){
        if(err){
            console.log("Error Inserting : %s", err);
        }

    });

});

router.post('/getRolesData', async function (req, res) {
    const {response, error} = await modeloRol.getRoles({idroles: req.body.idroles});
    if(error){
        console.log(response);
        res.sendStatus(500);
    }
    else{
        res.send({datos: response, err: false});
    }
});


module.exports = router;