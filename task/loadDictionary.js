var fs = require('fs');
var request = require('request');
var path = require('path');
var folderPath = path.resolve(__dirname, '../src/configs');

var baseUrl = 'http://op.krspace.cn';

function loadDictionaryData(callback){
    var cityFile = path.resolve(folderPath, 'dictionary.js');
    request(baseUrl+'/api/krspace-finance-web/dict/common', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(cityFile, 'module.exports = '+JSON.stringify(JSON.parse(body).data))+";";
            callback && callback();
        }
    })
}


loadDictionaryData();
