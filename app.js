/**
 * Created by 圈圈 on 2016/11/7.
 */
var http= require("http");  //引入http模块
var express=require("express"); //引入express中间件
var path = require("path"); //引入 path 中间件

var app = express(); //运行express

//将url地址指向项目中静态文件路径
app.use('/',express.static(__dirname + '/views'));
app.use('/static',express.static(__dirname + '/static'));

//启动一个服务 传入express 设置端口
http.createServer(app).listen('9888',function()
{
	console.log('server start at 9888');
})