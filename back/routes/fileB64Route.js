var express = require('express');
var router = express.Router();
var base64 = require('file-base64');

router.convertB64toFile = async function (b64){
    try{
        base64.decode(b64, 'text.new.txt', function(err, output) {
            console.log('success convertB64toFile');
        });
    }
    catch(e){
        console.log(e);
    }
};
router.convertFiletoB64 = async function (file){
    try{
        base64.encode(file, function(err, b64) {
            console.log("Success convertFiletoB64");
            console.log(b64);
        });
    }
    catch(e){
        console.log(e);
    }
};


//SE EL ALMACENA LA IMAGEN EN LA CARPETA public/imagesFile
router.saveImage = async function ({b64, name}){
    try{
        base64.decode(b64, `public/imagesFile/${name}`, function(err, output) {
            console.log('success saveImage');
        });
    }
    catch(e){
        console.log(e);
    }
};
module.exports = router;
