var Koa = new require('koa');
var app = new Koa();
var path = require('path');
var router = require('koa-router')();
var onerror = require('koa-onerror');
var convert = require('koa-convert');
var compress = require('koa-compress');
var logger = require('koa-logger');
var json = require('koa-json');
var views = require("koa-views");
var bodyparser = require('koa-bodyparser');
var staticDir = require('koa-static');
var open = require('open');


var webpack = require('webpack');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');

var config = require('./configs/config');
var webpackConfig = require('./webpack/webpack-dev.config');
var compiler = webpack(webpackConfig);



app.use(compress());

app.use(staticDir(path.join(__dirname,'static')));

app.use(bodyparser());

app.use(json());

app.use(logger());

app.use(function* (next){

	var start = new Date();
	yield next;
	var ms = new Date - start;

	console.log('%s-%s-%s',this.mothed,this.url,ms);
});

app.use(views(__dirname + '/static'));

app.use(convert(webpackDevMiddleware(compiler,{
	hot: true,    
	inline: false,
	quiet: false,
	noInfo: true,
	stats: { colors: true }
})));

app.use(convert(webpackHotMiddleware(compiler)));

webpackConfig.entry.unshift("webpack/hot/only-dev-server");
webpackConfig.entry.unshift("webpack-dev-server/client?http://127.0.0.1:"+config.app.port);  


var indexRouter = require('./configs/routes');

router.use('/',indexRouter.routes(),indexRouter.allowedMethods());

app.use(router.routes());

app.on('error',function(err,ctx){
	console.log('service error',err,ctx);
});

app.listen(config.app.port,'127.0.0.1',function(){
	console.log('正在启动......');
	open('http://localhost:' + config.app.port);
});


module.exports = app;

