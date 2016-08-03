var gulp = require('gulp');
var shell = require('gulp-shell');
var zip = require('gulp-zip');
var jeditor = require('gulp-json-editor');
var packageJSON = require('./package.json');

gulp.task('config-firefox', function() {
  gulp.src('./config/firefox/package.json')
  .pipe(jeditor({
    'name': packageJSON.name,
    'title': packageJSON.name,
    'description': packageJSON.description,
    'version': packageJSON.version,
    'author': packageJSON.author
  }))
  .pipe(gulp.dest('./src/firefox'));
  gulp.src('./js/content-script.js').pipe(gulp.dest('./src/firefox/data'));
});

gulp.task('dist-firefox', shell.task([
  'mkdir -p dist/firefox',
  'cd ./src/firefox && jpm xpi && ' +
  'mv ' + packageJSON.name + '.xpi ../../dist/firefox/' + packageJSON.name + '-firefox-' + packageJSON.version + '.xpi'
]));

gulp.task('config-chrome', function() {
  gulp.src('./config/chrome/manifest.json')
  .pipe(jeditor({
    'name': packageJSON.name,
    'description': packageJSON.description,
    'version': packageJSON.version,
    'author': packageJSON.author
  }))
  .pipe(gulp.dest('./src/chrome'));
  gulp.src('./js/content-script.js').pipe(gulp.dest('./src/chrome'));
});

gulp.task('dist-chrome', function () {
  gulp.src('./src/chrome/*')
    .pipe(zip(packageJSON.name + '-chrome-' + packageJSON.version + '.zip'))
    .pipe(gulp.dest('./dist/chrome'));
});

gulp.task('config', ['config-chrome', 'config-firefox']);

gulp.task('dist', ['dist-chrome', 'dist-firefox']);

gulp.task('default', ['config', 'dist']);
