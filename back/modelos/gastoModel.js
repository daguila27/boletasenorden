const dbPool = require('../dbPool');
var express = require('express');
var router = express.Router();

var fileB64 = require('../routes/fileB64Route');


router.insertGasto = async function (indata){
    /**
     * indata = {
        idcategoria: req.body.idcategoria,
        idusuario: req.body.iduser
    }
     * **/
    //idGasto, idUsuario, idCategoria, disabled
    try{
        const result = await dbPool.query("INSERT INTO gasto SET ?", indata);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};

router.insertDetalleGasto = async function (indata){
    /**
     * indata = {
        detalle: req.body.descripcion,
        valor: req.body.valor,
        idGasto: idgasto,
        imagen: 'nombre.txt',
        file: '',
    }**/

    var inImage = {
        b64: indata.file,
        name: indata.imagen
    };
    //se elimina indata.file para que no interfiera con la operación INSERT
    delete indata.file;
    //idDetalleGasto, idGasto, detalle, valor
    try{
        const result = await dbPool.query("INSERT INTO detallegasto SET ?", indata);
        //La image se almacena en la carpeta /public/imagesFile
        const file = await fileB64.saveImage(inImage);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
}

router.deleteGasto =  async function (indata){
    try{
        const result =  await dbPool.query("DELETE FROM Gasto WHERE idGasto=?", [indata.idGasto]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};

//Función que obtiene los gastos filtrados según texto (detalle o nomrbe de imagen);
router.selectGasto = async function (indata){
    //{texto : ""}
    try{
        const result = await dbPool.query("SELECT * FROM Gasto" +
            " LEFT JOIN DetalleGasto ON DetalleGasto.idGasto = Gasto.idGasto" +
            " LEFT JOIN Usuario ON Gasto.idUsuario = Usuario.idUsuario" +
            " LEFT JOIN Categoria ON Gasto.idCategoria = Categoria.idCategoria" +
            " LEFT JOIN Empresa ON Categoria.idEmpresa = Empresa.idEmpresa" +
            " LEFT JOIN UsuarioRol ON Usuario.idUsuario = UsuarioRol.idUsuario" +
            " WHERE (DetalleGasto.detalle = ? AND DetalleGasto.imagen = ?)", [[indata.texto, indata.texto]]);


        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};

//Función que obtiene los gastos filtrados según idusuario
//Obtiene los gatos realizados por el usuario
router.selectGastoByUser = async function (indata){
    //indata = {iduser : [1,2,3]}
    try{
        const result = await dbPool.query("SELECT * FROM Gasto" +
            " LEFT JOIN DetalleGasto ON DetalleGasto.idGasto = Gasto.idGasto" +
            " LEFT JOIN Usuario ON Gasto.idUsuario = Usuario.idUsuario" +
            " LEFT JOIN Categoria ON Gasto.idCategoria = Categoria.idCategoria" +
            " LEFT JOIN Empresa ON Categoria.idEmpresa = Empresa.idEmpresa" +
            " LEFT JOIN UsuarioRol ON Usuario.idUsuario = UsuarioRol.idUsuario" +
            " WHERE Usuario.idUsuario IN (?)", [indata.iduser.join(',')]);


        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};

//Función que obtiene los gastos filtrados según idcompañia
//Obtiene los gastos realizados por los empleados de la compañia
router.selectGastoByCompany = async function (indata){
    //indata = {idcompany : [1,2,3]}
    try{
        const result = await dbPool.query("SELECT * FROM Gasto" +
            " LEFT JOIN DetalleGasto ON DetalleGasto.idGasto = Gasto.idGasto" +
            " LEFT JOIN Usuario ON Gasto.idUsuario = Usuario.idUsuario" +
            " LEFT JOIN Categoria ON Gasto.idCategoria = Categoria.idCategoria" +
            " LEFT JOIN Empresa ON Categoria.idEmpresa = Empresa.idEmpresa" +
            " LEFT JOIN UsuarioRol ON Usuario.idUsuario = UsuarioRol.idUsuario" +
            " WHERE Empresa.idEmpresa IN (?)", [indata.idcompany.join(',')]);

        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};



//Función que obtiene los gastos filtrados según idgasto;
router.selectGastoById = async function (indata){
    //se recibe una arreglo de tal manera que se puede filtrar por varios identificadores.
    //{idGasto : [1, ... ]} o
    try{
        const result = await dbPool.query("SELECT * FROM Gasto" +
            " LEFT JOIN DetalleGasto ON DetalleGasto.idGasto = Gasto.idGasto" +
            " LEFT JOIN Usuario ON Gasto.idUsuario = Usuario.idUsuario" +
            " LEFT JOIN Categoria ON Gasto.idCategoria = Categoria.idCategoria" +
            " LEFT JOIN Empresa ON Categoria.idEmpresa = Empresa.idEmpresa" +
            " LEFT JOIN UsuarioRol ON Usuario.idUsuario = UsuarioRol.idUsuario" +
            " WHERE Gasto.idGasto in (?)", [indata.idGasto.join(',')]);


        return {response: result, err: false};

    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};


//Función que actualiza
router.UpdateGasto = async function (indata){
    try{
        const result = await dbPool.query("UPDATE gasto SET ? WHERE idGasto = ?", [indata]);
        return {response: result, err: false};
    }
    catch(e){
        console.log(e);
        return {response: e, err: true};
    }
};


module.exports = router;



