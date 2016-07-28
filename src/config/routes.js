var router = require('koa-router')();
var path = require('path');

router.get('*',function *(next){
	yield this.render('index');
});

/*
router.get('/user',function *(next){
	yield this.render('index.html',{bundleName:'user'});
});
*/

module.exports = function(app){

 app.use(router.routes());

};






