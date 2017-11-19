var fs = require('fs');
var request = require('request');
var path = require('path');
var folderPath = path.resolve(__dirname, '../src/configs');

var env = process.env.NODE_ENV;
var baseUrl = 'http://op.krspace.cn';


switch(env){

    case 'production':{
      baseUrl = 'http://op.krspace.cn';
      break;
    }

    case 'test':{
      baseUrl = 'http://optest.krspace.cn';
      break;
    }

    case 'test01':{
      baseUrl = 'http://optest01.krspace.cn';
      break;
    }

    case 'test02':{
      baseUrl = 'http://optest02.krspace.cn';
      break;
    }

    default:{
      baseUrl = 'http://op.krspace.cn';
    }

}


function loadErpDictionaryData(){
    var cityFile = path.resolve(folderPath, 'dictionary/erp.js');
    request(baseUrl+'/api/krspace-erp-web/dict/common', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(cityFile, 'module.exports = '+JSON.stringify(JSON.parse(body).data))+";";
        }
    })
}


function loadDictionaryData(){
    var cityFile = path.resolve(folderPath, 'dictionary/common.js');
    request(baseUrl+'/api/krspace-finance-web/dict/common', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(cityFile, 'module.exports = '+JSON.stringify(JSON.parse(body).data))+";";
        }

    })
}

loadErpDictionaryData();
loadDictionaryData();
