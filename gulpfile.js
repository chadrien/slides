var gulp = require('gulp'),
    g = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files'),
    es = require('event-stream');

gulp.task('dist', ['vendors'], function () {
    return dist('dist');
});

gulp.task('serve', ['server'], function () {
    gulp.watch('./app/**/*', ['tmp-build', 'reload']);
});

gulp.task('reload', function () {
    return gulp.src('./app/**/*')
        .pipe(g.connect.reload());
});

gulp.task('server', ['tmp-build'], function () {
    g.connect.server({
        root: '.tmp',
        livereload: true,
        port: 3000
    });
});

gulp.task('tmp-build', ['tmp-vendors'], function () {
    return dist('.tmp');
});

gulp.task('vendors', function () {
    return vendorDist('./dist/vendors');
});

gulp.task('tmp-vendors', function () {
    return vendorDist('./.tmp/vendors');
});

function dist(toFolder) {
    var baseUrl = getBaseUrl();

    return gulp.src('./app/**/*')
        .pipe(gulp.dest(toFolder))
        .pipe(es.wait(function () {
            gulp.src(toFolder + '/**/*.html')
                .pipe(g.replace(/\{\{BASE_URL\}\}/g, baseUrl))
                .pipe(gulp.dest(toFolder));
        }));
}

function vendorDist(toFolder) {
    var baseUrl = getBaseUrl();

    return gulp.src(bowerFiles({includeDev: true}))
            .pipe(gulp.dest(toFolder))
            .pipe(es.wait(function () {
                gulp.src(toFolder + '/screen.css')
                    .pipe(g.replace(/\.\.\/images/g, baseUrl + '/vendors'))
                    .pipe(g.replace(/\.\.\/fonts/g, baseUrl + '/vendors'))
                    .pipe(gulp.dest(toFolder));
            }));
}

function getBaseUrl() {
    var argv = require('minimist')(process.argv.slice(2));
    var baseUrl = 'http://localhost:3000';

    if (argv['base-url']) {
        baseUrl = argv['base-url'];
        if (baseUrl.substr(-1, 1) === '/') {
            baseUrl = baseUrl.substr(0, baseUrl.length - 1);
        }
    }

    return baseUrl;
}
