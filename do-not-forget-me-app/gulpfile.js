var gulp = require ('gulp'),
run = require('gulp-run'),
livereload = require('gulp-livereload'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
autoprefixer = require('gulp-autoprefixer'),
rimraf = require('gulp-rimraf'),
symdest = require('gulp-symdest'),
electron = require('gulp-atom-electron'),
sass = require('gulp-sass'),
electron2 = require('electron-connect').server.create();

var cssSources = [
  'assets/scss/*.scss',
];



gulp.task('default', ['serve']);

gulp.task('serve', function () {

  // Start browser process
  electron2.start();

  // Watch scss
  gulp.watch(cssSources, ['css']);
  // Restart browser process
  gulp.watch('main.js', electron2.restart);

  // Reload renderer process
  gulp.watch(['index.js', 'renderer.js', 'index.html', 'assets/css/app.min.css'], electron2.reload);
});


gulp.task('css', function(){
  gulp.src(cssSources)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('app.css'))
  //.pipe(autoprefixer({browsers: ['last 2 versions', 'ie 10']}))
  .pipe(gulp.dest('assets/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('assets/css'))
  .pipe(livereload());
})

// gulp.task('run', ['build'], function() {
//   return run('electron .').exec();
// });

gulp.task('build', function () {
	return gulp.src('*')
		.pipe(electron({ version: '1.7.9', platform: 'darwin' }))
		.pipe(symdest('app'));
});
