var gulp = require('gulp');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync');
var plumber = require('gulp-plumber');
var beeper = require('beeper');

/* PostCss plugins */
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

/* Browserify-related plugins */
var source = require('vinyl-source-stream');
var browserify = require('browserify');

// Error Helper
function onError(err) {
  beeper();
  console.log(err);
}

// The html task
gulp.task('html', function () {
    browsersync.reload('*.html');
});

// browserify
gulp.task('browserify', function(){
  browserify('./src/scripts/boundle.js')
    .bundle()
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(source('game.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

// jshint
/* gulp.task('jshint', function(){
    return gulp.src([
            './src/scripts/accordion.js',
            './src/scripts/map.js',
            './src/scripts/slider.js',
            './src/scripts/scrollBind.js',
            './src/scripts/emailForm.js',
            './src/scripts/main.js'
            ])
            .pipe(jshint())
            .pipe(jshint.reporter('default')
            .pipe(gulp.dest('./dist/scripts')));
}); */

// The images task
gulp.task('images', function(){
  return gulp.src([
    './src/assets/images/original/*.png',
    './src/assets/images/original/*.jpg',
    './src/assets/images/original/*.svg',
    './src/assets/images/original/*.gif'
    ])
    .pipe(imagemin())
    /*.pipe(gulp.dest('./src/assets/images/min')*/
    .pipe(gulp.dest('./dist/assets/images'));
});

// postCSS
gulp.task('css', function () {
  var processors = [
    precss,
    autoprefixer({browsers: ['last 2 versions', 'ie 9']})
    // cssnext
  ];
  return gulp.src('./src/styles/style.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'))
});

// The browsersync task
gulp.task('browsersync', function(cb) {
  return browsersync({
    files: [ './index.html' ],
    server:{
        baseDir:'./',
        directory: false
      }
  }, cb);
});

//watcher for postCSS and jshint
  gulp.task('watch', function(){
    gulp.watch([
    './src/assets/images/original/*.png',
    './src/assets/images/original/*.jpg',
    './src/assets/images/original/*.svg',
    './src/assets/images/original/*.gif'
    ], gulp.series('images'));
    gulp.watch([ 
      './src/styles/*.css',
      './src/styles/common/*.css',
      './src/styles/sections/*.css',
      './src/styles/elements/*.css',
      './src/styles/mobile/*.css' ], gulp.series('css'));
    // gulp.watch('./src/scripts/*.js', gulp.series('jshint'));
    gulp.watch('./src/scripts/*.js', gulp.series('browserify'));
    gulp.watch('./*.html', gulp.series('html'));
  });

  // The Default task
  gulp.task('default', gulp.parallel('html', 'browserify', 'images', 'css', 'browsersync', 'watch'));
