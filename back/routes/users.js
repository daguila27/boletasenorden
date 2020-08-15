var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const axios = require('axios');
var dbPool = require('../dbPool');
var jwt = require('jsonwebtoken');




router.options('/getLogin', function (req, res) {
  res.sendStatus(200);
});

router.post('/getLogin', function (req, res) {
  dbPool.query('SELECT * FROM usuario WHERE email = ? AND pass = ?', [req.body.email, req.body.password])
      .then(data => {
        if(data.length === 1){
          console.log("¡Log In Exitoso!");
          //SIEMPRE RESPONDE UN JSON
          /*{err: true|false, msg: ""}*/
          res.json(jwt.sign({err: false, msg: "¡Log In Exitoso!", iduser: data[0].idUsuario}, 'holamundo') );
        }else{
          console.log("¡Ha ocurrido un problema!");
          res.json({err: true, msg: "Correo y/o contraseña invalidos.", iduser: 0});
        }
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
});



router.options('/checkToken', function(req,res) {
  res.sendStatus(200)
});

router.post('/checkToken', function (req, res) {
  if (typeof req.body.token == 'string') {
    try{
      const decoded = jwt.verify(req.body.token, req.app.get('secretToken'))
      res.header('status', '200').send(decoded)
    } catch(e){
      switch(e.name){
        case 'TokenExpiredError':
          res.header('status', '401').send(e)
          break;
        case 'JsonWebTokenError':
          res.header('status', '409').send(e)
          break;
        default:
          res.header('status', '403').send(e)
          break;
      }
    }
  } else {
    res.header('status', '401').send({err: true, error: 'Token Invalido'})
  }
});

router.post('/addUser', function (req, res) {
  //RECIBE EL NOMBRE DE LA EMPRESA;
  var indata = {
    "nombre": "Jose",
    "apellido": "Maria",
    "email": "correo@pagina.com",
    "pass": "1234"
  };

    dbPool.query("INSERT INTO usuario VALUES ?", [indata], function(err, data){
      if(err){
        console.log("Error Inserting : %s", err);
      }

    });
});



router.post('/connectUserCompany', function (req, res) {
  //RECIBE id de usuario e id de rol
  var indata = {
    idUsuario: 1,
    idRol: 1
  };
  dbPool.query("INSERT INTO UsuarioRol VALUES ?", [indata], function(err, data){
    if(err){
      console.log("Error Inserting : %s", err);
    }

  });
});

router.get('/profile', function (req, res) {
  console.log(req.body.username + "&&" + req.body.password +"@@"+ typeof req.body);

});




module.exports = router;
