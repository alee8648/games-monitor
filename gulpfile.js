var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', ['sass'], function() {
	browserSync.init({
		proxy: "localhost:8081"
	});

	gulp.watch(["develop/styles/*.scss"], ['sass']); //.on('change', browserSync.reload);
	// gulp.watch("develop/scripts/*.js", ['scripts']).on('change', browserSync.reload);
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html handlebars json',
    env: { 'NODE_ENV': 'development' }
  }).on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('sass', function() {
	console.log("Compiling SASS files");
	return gulp.src('develop/styles/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('build'));
});

gulp.task('scripts:plugins', function() {
	console.log("Compiling plugins JS files");
	return gulp.src([
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/datatables.net/js/jquery.dataTables.js'
		])
		.pipe(concat('plugins.js'))
		.pipe(gulp.dest('develop/scripts/'));
});

gulp.task('scripts', function() {
	return gulp.src([
		'develop/scripts/plugins.js',
		'develop/scripts/global.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('build'));
});

gulp.task('default', ['sass', 'start', 'serve']);