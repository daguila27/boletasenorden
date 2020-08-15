var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const axios = require('axios');
var dbPool = require('../dbPool');
var modeloGasto = require('../modelos/gastoModel');

router.post('/addExpend', async function (req, res) {
    //RECIBE EL NOMBRE DE LA EMPRESA;

    var ingasto = {
        idCategoria: req.body.idcategoria,
        //idrol: req.body.idrol,
        idUsuario: req.body.idusuario
    };
    var indetalle = {
        detalle: req.body.descripcion,
        valor: req.body.valor,
        idgasto: 0,
        image: req.body.image,
        file: req.body.file
    };

    console.dir(ingasto);
    console.dir(indetalle);
    const {response, err} = await modeloGasto.insertGasto(ingasto);
    if(err){
        console.log(err);
        res.send({datos: response, msg:'Ha ocurrido un error al registrar el gasto.' , err: true});
        res.sendStatus(500);
    }
    else{
        indetalle.idgasto = response.insertId;
        //ESTO NO SE SI ESTÁ BIEN
        const {responseDet, err2} = await modeloGasto.insertDetalleGasto(indetalle);
        if(err2){
            console.log(err);
            res.send({datos: responseDet, msg:'Ha ocurrido un error al registrar el gasto.', err: true});
            res.sendStatus(500);
        }
        else{
            res.send({datos: response, msg:'¡Gasto registrado con éxito!', idgasto: response.insertId, err: false});
        }
    }
});



router.post('/deleteExpend', async function (req, res) {
    //RECIBE EL NOMBRE DE LA EMPRESA;
    var indata = {idGasto: 1};
    const {response, err} = await modeloGasto.deleteGasto(indata);
    if(err){}
    else{}

});



router.get('/allExpend',async function (req, res) {
    //{texto: ""}
    const {response, err} = await modeloGasto.selectGasto(indata);
    if(err){}
    else{}

});




router.post('/editExpend', async function (req, res) {
    /*
    {
    nombre: ,
    fecha: ,
    valor: 
    }
    */
    //UNA FUNCIÓN QUE RECIBE OBJETO data Y HACE EL update
    const {response, err} = await updateGasto.selectGasto(indata);
    if(err){}
    else{}

});

module.exports = router;
