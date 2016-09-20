var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('gulp-main-bower-files'),
    gulpFilter = require('gulp-filter'),
    open = require('gulp-open'),
    runSequence = require('run-sequence'),
    stripDebug = require('gulp-strip-debug'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    gutil = require('gulp-util'),
    del = require('del'),
    rename = require("gulp-rename"),
    gulpNgConfig = require('gulp-ng-config'),
    config = require('./gulp-config');

gulp.task('sass', function () {
    var configSass = config.sass;

    return gulp.src(configSass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: configSass.outputStyle }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(configSass.dest))
        .pipe(connect.reload());
});

gulp.task('templateCache', function() {
    var configTemplate = config.htmlTemplate;

    return gulp.src(configTemplate.src)
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest(configTemplate.dest));
});

gulp.task('watch', function() {
    var configWatch = config.watch;

    gulp.watch(configWatch.sass, ['sass']);

    gulp.watch(configWatch.templates, function() {
        runSequence('templateCache');
    });

    gulp.watch(configWatch.js, function() {
        runSequence('app', 'reload');
    });
});

gulp.task('app', function() {
    var configScripts = config.js.app;

    return gulp.src(configScripts.src)
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error',handleError))
        .pipe(concat(configScripts.outputName).on('error',handleError))
        .on('error',handleError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(configScripts.dest));
});

gulp.task('copy-assets', function() {
    var configAssets = config.assets;

    gulp.src(['./client/index.html', './client/favicon.ico'])
        .pipe(gulp.dest('./client/dist'));

    gulp.src(configAssets.stylesheet.src)
        .pipe(gulp.dest(configAssets.stylesheet.dest));

    gulp.src(configAssets.javascript.src)
        .pipe(gulp.dest(configAssets.javascript.dest));

    gulp.src(configAssets.font.src)
        .pipe(gulp.dest(configAssets.font.dest));

    return gulp.src(configAssets.images.src)
        .pipe(gulp.dest(configAssets.images.dest));
});

gulp.task('jshint', function() {
    var configJshint = config.js.app;

    configJshint.src.push('!./client/app/templates.js', '!./client//app/app.constant.js');

    return gulp.src(configJshint.src)
        .pipe(jshint())
        .pipe(jshint.reporter())
});

gulp.task('jscs', function() {
    var configJscs = config.js.app;

    configJscs.src.push('!./client/app/templates.js', '!./client/app/app.constant.js');

    return gulp.src(configJscs.src)
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('vendors', function() {
    var configVendors = config.js.vendor,
        filterJS = gulpFilter('**/*.js', { restore: true });

    return gulp.src(configVendors.src)
        .pipe(mainBowerFiles({
            paths: {
                bowerDirectory: './client/vendor',
                bowerrc: './.bowerrc',
                bowerJson: './bower.json'
            },

            overrides: {
                angular: {
                    ignore: true
                },

                bootstrap: {
                    ignore: true
                },

                jquery: {
                    ignore: true
                },

                'components-font-awesome': {
                    ignore: true
                },

                'bootstrap-sass': {
                    ignore: true
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat(configVendors.outputName))
        .pipe(uglify())
        .pipe(gulp.dest(configVendors.dest));
});

gulp.task('config-local', function() {
    return gulp.src('env.json')
        .pipe(gulpNgConfig('app', config.env.local))
        .pipe(rename('app.constant.js'))
        .pipe(gulp.dest('./client/app'));
});


gulp.task('default', devTask);

function handleError(error) {
   gutil.log(error.message);
}

function devTask () {
    del(config.del.src).then(function(paths) {
        runSequence('config-local', 'copy-assets', 'templateCache', 'vendors', 'app', 'sass', 'watch', 'server');
    });
}
