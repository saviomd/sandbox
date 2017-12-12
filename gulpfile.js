var browserSync = require('browser-sync');
var browserSyncConfig = require('tools-config-saviomd/browser-sync-config');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jade = require('gulp-jade');
var jadeConfig = require('tools-config-saviomd/jade-config');

/*
tasks
====================
*/
gulp.task('clean', function(cb) {
	return del([
			'+(css|fonts|js|p)',
			'index.html'
		], cb)
});

gulp.task('html', function() {
	return gulp.src('_src/pages/**/*.jade')
		.pipe(jade(jadeConfig))
		.pipe(gulp.dest('./'))
});

gulp.task('cssVendor', function() {
	return gulp.src([
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/animate.css/animate.min.css',
			'node_modules/font-awesome/css/font-awesome.min.css'
		])
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('css'))
});

gulp.task('jsVendor', function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/popper.js/dist/umd/popper.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'node_modules/holderjs/holder.min.js',
			'node_modules/jquery-smooth-scroll/jquery.smooth-scroll.min.js',
			'node_modules/wow/wow.min.js'
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('js'))
});

gulp.task('fontsCopy', function() {
	return gulp.src([
			'node_modules/font-awesome/fonts/*'
		])
		.pipe(gulp.dest('fonts'))
});

gulp.task('browserSync', function() {
	browserSync.init(browserSyncConfig);
});

/*
build and dev tasks
====================
*/
gulp.task('default', ['clean'], function() {
	gulp.start('html', 'cssVendor', 'jsVendor', 'fontsCopy');
});

gulp.task('dev', ['browserSync'], function() {
	gulp.watch('_src/+(data|includes|mixins|pages|templates)/**/*.jade', ['html', browserSync.reload])
});
