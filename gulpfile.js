var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var preprocess = require('gulp-preprocess');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var sh = require('shelljs');

var paths = {
    sass: ['./scss/**/*.scss'],
    templatecache: ['./www/app/**/*.html']    
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);    
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('dev', function () {
    gulp.src('./templates/appsettings.js')
        .pipe(preprocess({
            context: {
                ENV: 'DEVELOPMENT',
                DEBUG: true
            }
        }))
        .pipe(gulp.dest('./www/app/'));
});

gulp.task('test_env', function () {
    gulp.src('./templates/appsettings.js')
        .pipe(preprocess({
            context: {
                ENV: 'TEST',
                DEBUG: true
            }
        }))
        .pipe(gulp.dest('./www/app/'));
});

gulp.task('prod', function () {
    gulp.src('./templates/appsettings.js')
        .pipe(preprocess({
            context: {
                ENV: 'PRODUCTION'
            }
        }))
        .pipe(gulp.dest('./www/app/'));
});
