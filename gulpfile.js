var browserSync = require('browser-sync');
var browserSyncConfig = require('tools-config-saviomd/browser-sync-config');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var pug = require('gulp-pug');
var pugConfig = require('tools-config-saviomd/pug-config');

/*
tasks
====================
*/
gulp.task('clean', function(cb) {
	return del([
			'+(assets|p)',
			'index.html'
		], cb)
});

gulp.task('html', function() {
	return gulp.src('_src/pages/**/*.pug')
		.pipe(pug(pugConfig))
		.pipe(gulp.dest('./'))
});

gulp.task('copyAssets', function() {
	return gulp.src([
			'node_modules/holderjs/holder.min.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/tailwindcss/dist/tailwind.css'
		])
		.pipe(gulp.dest('assets'))
})

gulp.task('browserSync', function() {
	browserSync.init(browserSyncConfig);
});

/*
build and dev tasks
====================
*/
gulp.task('default', ['clean'], function() {
	gulp.start('html', 'copyAssets');
});

gulp.task('dev', ['browserSync'], function() {
	gulp.watch('_src/+(data|includes|mixins|pages|templates)/**/*.pug', ['html', browserSync.reload])
});
