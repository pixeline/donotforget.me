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
sass = require('gulp-sass'),
electron = require('electron-connect').server.create(),
runSequence = require('run-sequence');

const shell = require('gulp-shell');

var cssSources = [
  'src/assets/scss/**/*.scss',
];

gulp.task('default', ['serve']);

gulp.task('serve', function () {

  // Start browser process
  electron.start();
  // Watch scss
  gulp.watch(cssSources, ['css']);
  // Restart browser process
  gulp.watch('src/main.js', electron.restart);
  // Reload renderer process
  gulp.watch(['src/index.js', 'src/renderer.js', 'src/index.html', 'src/assets/css/app.min.css'], electron.reload);
});


gulp.task('css', function(){
  gulp.src(cssSources)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('app.css'))
  //.pipe(autoprefixer({browsers: ['last 2 versions', 'ie 10']}))
  .pipe(gulp.dest('src/assets/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('src/assets/css'))
  .pipe(livereload());
})

gulp.task('build', function() {
  runSequence('build-mac','build-linux');
});
gulp.task('build-mac', shell.task('npm run package-mac'))
gulp.task('build-linux', shell.task('npm run package-linux'))
