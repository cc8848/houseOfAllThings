/**
 * Created by 圈圈 on 2016/11/7.
 */
var http= require("http");  //引入http模块
var express=require("express"); //引入express中间件
var path = require("path"); //引入 path 中间件

var app = express(); //运行express

//开发环境
app.use('/dev/views', express.static(__dirname + '/views'))
app.use('/dev/static', express.static(__dirname + '/static'))

//部署环境
app.use('/', express.static(__dirname + '/dist/views'))
app.use('/static', express.static(__dirname + '/dist/static'))

//启动一个服务 传入express 设置端口
http.createServer(app).listen('16081',function()
{
	console.log('server start at 16081');
})