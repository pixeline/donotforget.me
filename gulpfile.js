/*
## Release a new version :
gulp build
gulp version:bump
gulp github-release

## dev
gulp
*/

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
runSequence = require('run-sequence'),
release = require('gulp-github-release');
const plumber = require('gulp-plumber');
const bump = require('gulp-bump');
const prompt = require('gulp-prompt');
var pkg = require('./package.json');
const shell = require('gulp-shell');
var notify = require('gulp-notify');

var cssSources = [
  'src/assets/scss/**/*.scss',
];


// Error handler
plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

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
  .pipe(gulp.dest('src/assets/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('src/assets/css'))
  .pipe(livereload());
})

gulp.task('build', function() {
  runSequence('build-mac','build-linux','build-win', 'packages');
});
gulp.task('packages', function() {
  runSequence('build-dmg','build-win-installer');
});
gulp.task('build-mac', shell.task('npm run package-mac'))
gulp.task('build-dmg', shell.task('npm run package-dmg'))
gulp.task('build-linux', shell.task('npm run package-linux'))
gulp.task('build-win', shell.task('npm run package-win'))
gulp.task('build-win-installer', shell.task('npm run create-installer-win'))

// Github release
gulp.task('github-release', function(){
  gulp.src(['./'])
  .pipe(plumber(plumberErrorHandler))
  .pipe(
    prompt.prompt(
      [{
        type: 'confirm',
        name: 'prerelease',
        message: 'Is this a pre-release ?',
        default: false
      },
      {
        type: 'textarea',
        name: 'description',
        message: 'Write a Release note : (enter to skip)',
        choices: ['patch', 'minor', 'major' ],
        default: 'patch'
      }]
      , function(res){
        gulp.src(['./release-builds/*.exe', './release-builds/*.dmg', './release-builds/*.deb'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(release({
          token: '07fde602f06cef40128b2f8152e780125430509f',
          owner: 'pixeline',
          tag: 'v' + pkg.version,
          notes: res.description,
          draft: false,
          prerelease: res.prerelease,
          manifest: require('./package.json') // package.json from which default values will be extracted if they're missing
        }));
      })
    )
  });

  // Version management
  gulp.task("version:bump", function () {
    return gulp.src("*")
    .pipe(plumber(plumberErrorHandler))
    .pipe(
      prompt.prompt({
        type: 'list',
        name: 'bump',
        message: 'Which type of release: "patch", "minor", or "major" ?',
        choices: ['patch', 'minor', 'major' ],
        default: 'patch'
      }, function(res){
        //value is in res.bump
        return gulp.src("./package.json")
        .pipe(bump({ type: res.bump }))
        .pipe(gulp.dest("./"));
      })
    );
  });


  gulp.task("version:reset", function(){
    return gulp.src("./package.json")
    .pipe(plumber(plumberErrorHandler))
    .pipe(bump({ version: '1.0.0' }))
    .pipe(gulp.dest("./"));
  });
