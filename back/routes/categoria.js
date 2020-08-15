var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const axios = require('axios');
var dbPool = require('../dbPool');
var modeloCategoria = require('../modelos/categoriaModel');
var modeloCategoriaPermitida = require('../modelos/categoriaPermitidaModel');

router.post('/addCategory', async function (req, res) {
    /** {  nombre: `${nombre}`,
           idcompany: `${idcompany}`,
           idroles: `${idroles}` -> '1,2,3' String
       }**/
    //Datos de Categoria
    //Roles Asociados (debemos asegurarnos que los roles enviados le pertenezcan a la Empresa en cuestión)
    const indata = {
        name: req.body.nombre,
        idcompany: req.body.idcompany,
        idroles: req.body.idroles
    };

    const insertCategorieResult = await modeloCategoria.save({name: indata.name,idcompany: indata.idcompany});

    indata.idroles = indata.idroles.split(',');
    if(!insertCategorieResult.err){
        let resultArray = await Promise.all(
            indata.idroles.map(async (item) => {
                return modeloCategoriaPermitida.save({idcategoria: insertCategorieResult.response.insertId, idrol: item});
            })
        );
        resultArray.filter((item) => {return item.err});
        if(resultArray.length > 0){res.send({msg: "¡Registro de Categoria exitoso!", err: false});}
        else{res.send({msg: "¡Registro de Categoria exitoso!", err: false});}
    }else{
        res.send({msg: "¡Error al registrar la Categoria!", err: true});
    }
});



router.post('/deleteCategory', function (req, res) {
    //RECIBE EL NOMBRE DE LA EMPRESA;
    var indata = {idCategoria: 1};
    req.getConnection(function(err, connection){
        if(err){
            console.log("Error Connecting : %s", err);
        }
        connection.query("DELETE FROM Categoria WHERE idCategoria=?", [indata.idCategoria], function(err, data){
            if(err){
                console.log("Error Inserting : %s", err);
            }

        });
    });
});
router.post('/editCategoria', function (req, res) {
    req.getConnection(function(err, connection){
        if(err){
            console.log("Error Connecting : %s", err);
        }
        connection.query("UPDATE Categoria SET ?", [indata], function(err, data){
            if(err){
                console.log("Error Inserting : %s", err);
            }

        });
    });
});
router.post('/getCategoriesData', async function (req, res) {
    const {response, error} = await modeloCategoria.getCategories({idcategories: req.body.idcategories});
    if(error){
        console.log(response);
        res.sendStatus(500);
    }
    else{
        res.send({datos: response, err: false});
    }
});

router.post('/getDataCategoriesForUser', async function (req, res) {
    //Recibe id de usuario y retorna las categorías permitidas
    const {response, error} = await modeloCategoria.getCategoriesForUser({iduser: req.body.iduser, idrol: req.body.idrol});
    if(error){
        console.log(response);
        res.sendStatus(500);
    }
    else{
        res.send({datos: response, err: false});
    }
});




module.exports = router;