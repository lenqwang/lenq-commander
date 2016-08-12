var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	webpack = require('webpack'),
	less = require('gulp-less'),
	cssnext = require('cssnext'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rename = require('gulp-rename'),
	postcss = require('gulp-postcss'),
	precss = require('precss'),
	autoprefixer = require('autoprefixer'),
	del = require('del');

var config = require('./webpack.config');

/**
 * 清理生成目录文件
 * @param  {[type]} cb) {	del(['./dist/*.js', './dist/*.css', './dist/*.map']).then(paths [description]
 * @return {[type]}     [description]
 */
gulp.task('clean', function(cb) {
	del(['./dist/js/*.js', './dist/css/*.css', './dist/js/*.map', './dist/image/*']).then(paths => {
		console.log('deleted files and folders:\n', paths.join('\n'));
		cb();
	});
});

/**
 * 执行webpack打包
 * @param  {[type]} cb) {	webpack(config, cb);} [description]
 * @return {[type]}     [description]
 */
gulp.task('webpack', ['clean'], function(cb) {
	webpack(config, cb);
});

/**
 * 压缩css文件
 * @param  {[type]} ) {	gulp.src('./dist/style.css')		.pipe(rename({suffix: '.min'}))		.pipe(minifycss())		.pipe(gulp.dest('dist'));} [description]
 * @return {[type]}   [description]
 */
gulp.task('mincss', ['postcss'], function() {
	gulp.src('./dist/css/*.css')
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
});

/**
 * 压缩js文件
 * @param  {[type]} ) {	gulp.src('./dist/*.js')		.pipe(rename({suffix: '.min'}))		.pipe(uglify())		.pipe(gulp.dest('dist'));} [description]
 * @return {[type]}   [description]
 */
gulp.task('minjs', function() {
	gulp.src('./dist/js/*.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// postcss
gulp.task('postcss', function() {
	var processors = [
        autoprefixer,
        cssnext,
        precss
    ];

	gulp.src('./src/css/*.less')
		.pipe(less())
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist/css'));
});

// 压缩图片
gulp.task('minimg', function() {
    return gulp.src(['./src/image/*', './dist/js/src/image/*'])
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/image'));
});

gulp.task('default', ['webpack'], function() {
	// console.log(process.env.NODE_ENV);
	gulp.start('mincss', 'minjs', 'minimg');
});
