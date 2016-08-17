var router = require('koa-router')();

router.get('*',function *(next){
	console.log('-----0-0-');
	yield this.render('index.html');
});


module.exports = router;




