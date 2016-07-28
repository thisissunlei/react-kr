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
var dust = require('koa-dust');


var webpack = require('webpack');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');

var config = require('./src/config/config');
var webpackConfig = require('./webpack/webpack-dev.config');
var compiler = webpack(webpackConfig);

//webpackConfig.entry.index.unshift("webpack-dev-server/client?http://localhost:8001");  // 将执替换js内联进去
//webpackConfig.entry.index.unshift("webpack/hot/only-dev-server");



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


app.use(views(__dirname + '/static', {
	/*
  map: {
    html: 'dust'
  }
  */
}));

/*
app.use(dust(path.join(__dirname,'views')));
*/



app.use(convert(webpackDevMiddleware(compiler,{
	hot:true,
	noInfo:true,
	stats: { 
		colors: true  // 用颜色标识
	},
	publicPath:webpackConfig.output.publicPath
})));

app.use(convert(webpackHotMiddleware(compiler)));


var routerConfig = require('./src/config/routes');
	routerConfig(app);



app.on('error',function(err,ctx){
	console.log('service error',err,ctx);
});


app.listen(config.app.port,'127.0.0.1',function(err){

});


module.exports = app;

