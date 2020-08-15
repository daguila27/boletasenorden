var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const axios = require('axios');
var dbPool = require('../dbPool');

var modeloGasto = require('../modelos/gastoModel');
var modeloUsuario = require('../modelos/usuarioModel');
var modeloEmpresa = require('../modelos/empresaModel');

router.post('/addCompany', function (req, res) {
    //RECIBE EL NOMBRE DE LA EMPRESA;
    var indata = {nombre: "Node"};
    dbPool.query("INSERT INTO empresa VALUES ?", [indata], function(err, data){
        if(err){
            console.log("Error Inserting : %s", err);
        }

    });

});
router.post('/deleteCompany', function (req, res) {
    //RECIBE EL NOMBRE DE LA EMPRESA;
    var indata = {idGasto: 1};
    dbPool.query("DELETE FROM Empresa WHERE idEmpresa=?", [indata.idGasto], function(err, data){
        if(err){
            console.log("Error Inserting : %s", err);
        }

    });

});
router.post('/editCompany', function (req, res) {
     dbPool.query("UPDATE Empresa SET ?", [sindata], function(err, data){
         if(err){
             console.log("Error Inserting : %s", err);
         }

     });
});


//SE OBTIENE LOS DATOS GENERALES DE LA EMPRESA (número de empleados, fecha de registro, idcompañia(necesaria para obtener roles y categorias) )
router.post('/getDataCompany', async function (req, res) {
    //Se recibe idUsuario Administrador de la empresa en la plataforma
    //Se obtiene los datos de la Empresa de la cual el usuario es administrador
    const {response, err} = await modeloEmpresa.getDataCompanyFromAdmin({iduser: req.body.iduser});
    if(err){
        console.log(response);
        res.sendStatus(500);
    }
    else{
        res.send({datos: response, err: false});
    }
});



router.post('/getEmployee', async function (req, res) {
    //Se recibe idUsuario Administrador de la empresa en la plataforma
    //Se obtiene los datos de la Empresa de la cual el usuario es administrador
    //{idcompany: req.body.idcompany}
    const {response, err} = await modeloEmpresa.getEmployeeData({idcompany: req.body.idcompany});
    if(err){
        console.log(response);
        res.sendStatus(500);
    }
    else{
        res.send({datos: response, err: false});
    }
});


module.exports = router;
