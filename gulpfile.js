var gulp = require('gulp');
var gutils = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var livereload = require('gulp-livereload');

var getBundler = function () {
  var bundler = browserify({
    entries: ['./src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPath: {}
  });
  return bundler;
};

var build = function (bundler) {
  return bundler.bundle()
    .on('error', gutils.log.bind(gutils, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'));
};

gulp.task('default', function () {
  build(getBundler());
});

gulp.task('watch', function () {
  var bundler = getBundler();
  var watch = watchify(bundler);
  build(bundler);
  livereload.listen();
  watch.on('update', function (files) {
    gutils.log('Recompiling files ' + files);
    build(bundler).pipe(livereload());
  });
});
