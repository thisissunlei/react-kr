var router = require('koa-router')();

router.get('/',function *(next){
	yield this.render('index.html',{bundleName:'index'});
});

router.get('/user',function *(next){
	yield this.render('index.html',{bundleName:'user'});
});

module.exports = function(app){

 app.use(router.routes());

};






