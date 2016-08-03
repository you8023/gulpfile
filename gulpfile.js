// gulp.task('default',['testLess']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径
var gulp = require('gulp');
var jshint = require('gulp-jshint');//语法检查
var concat = require('gulp-concat');//合并文件
var uglify = require('gulp-uglify');//压缩代码
var rename = require('gulp-rename');//重命名
var less = require('gulp-less');//less转换为css

// 针对js
// 语法检查
gulp.task('jshint', function () {
	return gulp.src('index.js')
			   .pipe(jshint())
			   .pipe(jshint.reporter('default'));
});
// 合并文件之后压缩代码
gulp.task('minify', function (){
	return gulp.src('index.js')
			   .pipe(concat('all.js'))
			   .pipe(gulp.dest('js'))
			   .pipe(uglify())
			   .pipe(rename('min.js'))
			   .pipe(gulp.dest('js'));
});
// 监视文件的变化
gulp.task('watch', function () {
	gulp.watch('index.js', ['jshint', 'minify']);
});

// 针对less
// less转换为css并压缩
gulp.task('testless', function () {
	return gulp.src('index.less')
	           .pipe(less())
	           .pipe(uglify())
	           .pipe(gulp.dest('css'));
});
// 注册缺省任务
gulp.task('default', ['testless', 'jshint', 'minify', 'watch']);
// gulp.task('default', ['jshint', 'minify']);
