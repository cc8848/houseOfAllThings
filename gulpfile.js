/**
 * Created by chenbin on 2016/11/15.
 */
var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	nodemon = require('nodemon'),
	del = require('del');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//编译stylus
gulp.task('stylus', function(){
	return gulp.src('./static/stylus/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./static/css'));
});

//压缩css
gulp.task('minifycss', ['stylus'], function(){
	return gulp.src('./static/css/**/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('./dist/static/css'));
});

//压缩html
gulp.task('htmlmin',function(){
	// gulp.src(['.views/index.html','./views/login.html'])
	gulp.src('./views/**/*.html')
		.pipe(htmlmin())
		.pipe(gulp.dest('./dist/views'));
});

//压缩js
gulp.task('uglify',function(){
	gulp.src('./static/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/static/js'));
});


//压缩图片
gulp.task('imagemin',function(){
	gulp.src('./static/images/**/*.{png,jpg,gif,ico}')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/static/images'));
});


//启动服务器
gulp.task('nodemon', (a)=> {
	let ft = false;
	return nodemon({
		script: 'app.js'
	}).on('start', ()=> {
		if (!ft) {
			a();
			ft = true;
		}
	});
});

//  proxy 服务器代理
gulp.task('browser-sync',['nodemon'] , ()=> {
	browserSync.init({
	proxy: {
		target: 'http://127.0.0.1:16081'
	},
	files: ['*'],
	open: false,
	notify: false,
	port: 9800
});
});

//编译前清除文件
gulp.task('clean', function(opt){
	del(['./dist'], opt);
});

//构建项目
gulp.task('build', ['stylus', 'minifycss', 'uglify', 'imagemin', 'htmlmin']);

//监听文件变更
gulp.task('watch', function(){
	gulp.watch('./static/stylus/**/*.styl', ['stylus']);
	gulp.watch([
		'./views/**/*.html',
		'./static/css/**/*.css',
		'./static/js/**/*.js',
		'./static/images/**/*.{png,jpg,ico,gif}}'
	]).on('change', reload);
});

//启动任务
gulp.task('default', ['browser-sync', 'stylus', 'watch'], function(){
	console.log("gulp default");
});