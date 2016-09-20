var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
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
    config = require('./gulpConfig');

gulp.task('server', function() {
    connect.server({
        root: config.serverRoot,
        livereload: true,
        debug: true,
        port: config.serverPort
    });

  return gulp.src(config.staticIndex).pipe(open({ uri: 'http://localhost:' + config.serverPort }));
});

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

gulp.task('reload', function() {
  return gulp.src(config.staticIndex)
    .pipe(connect.reload());
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

gulp.task('app-dist', function() {
    var configScripts = config.js.app;

    return gulp.src(configScripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat(configScripts.outputName))
        .pipe(stripDebug())
        .pipe(uglify())
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

gulp.task('config-dev', function() {
    return gulp.src('env.json')
        .pipe(gulpNgConfig('app', config.env.develop))
        .pipe(rename('app.constant.js'))
        .pipe(gulp.dest('./client/app'));
});

gulp.task('config-qa', function() {
    return gulp.src('env.json')
        .pipe(gulpNgConfig('app', config.env.qa))
        .pipe(rename('app.constant.js'))
        .pipe(gulp.dest('./client/app'));
});

gulp.task('config-prod', function() {
    return gulp.src('env.json')
        .pipe(gulpNgConfig('app', config.env.prod))
        .pipe(rename('app.constant.js'))
        .pipe(gulp.dest('./client/app'));
});

gulp.task('copy-dist-to-api', function() {
    return del(config.dist.dest, { force: true }).then(function() {
        return gulp.src(config.dist.src)
            .pipe(gulp.dest(config.dist.dest));
    });
});

gulp.task('default', devTask);
gulp.task('qa', qaTask);
gulp.task('build-dev', buildDevTask);
gulp.task('build-qa', buildQaTask);
gulp.task('prod', prodTask);
gulp.task('build-prod', buildProdTask);
gulp.task('copy-dist-dev', copyDistDev);
gulp.task('copy-dist-qa', copyDistQa);
gulp.task('copy-dist-prod', copyDistProd);

function handleError(error) {
   gutil.log(error.message);
}

function devTask () {
    del(config.del.src).then(function(paths) {
        runSequence('config-local', 'copy-assets', 'templateCache', 'vendors', 'app', 'sass', 'watch', 'server');
    });
}

function qaTask () {
    del(config.del.src).then(function(paths) {
        runSequence('config-qa', 'copy-assets', 'templateCache', 'vendors', 'app-dist', 'sass', 'server');
    });
}

function copyDistDev(next) {
  runSequence('build-dev', 'copy-dist-to-api', next);
}

function copyDistQa(next) {
  runSequence('build-qa', 'copy-dist-to-api', next);
}

function copyDistProd(next) {
  runSequence('build-prod', 'copy-dist-to-api', next);
}

function buildDevTask (next) {
    del(config.del.src).then(function(paths) {
        runSequence('config-dev', 'copy-assets', 'templateCache', 'vendors', 'app', 'sass', next);
    });
}

function buildQaTask (next) {
    del(config.del.src).then(function(paths) {
        runSequence('config-qa', 'copy-assets', 'templateCache', 'vendors', 'app-dist', 'sass', next);
    });
}

function prodTask (next) {
    del(config.del.src).then(function(paths) {
        runSequence('config-prod', 'copy-assets', 'templateCache',
                    'vendors', 'app-dist', 'sass', 'server',
                    next);
    });
}

function buildProdTask (next) {
    del(config.del.src).then(function(paths) {
        runSequence('config-prod', 'copy-assets', 'templateCache', 'vendors', 'app-dist', 'sass', next);
    });
}