var gulp = require('gulp'),
    g = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files');

var appSrc = [
    './app/**/*',
    '!./app/**/demo/**/*'
];

gulp.task('dist', ['vendors'], function () {
    return dist('dist');
});

gulp.task('serve', ['server'], function () {
    gulp.watch(appSrc, ['tmp-build', 'reload']);
});

gulp.task('reload', function () {
    return gulp.src(appSrc)
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
    return gulp.src(appSrc)
        .pipe(gulp.dest(toFolder));
}

function vendorDist(toFolder) {
    return gulp.src(bowerFiles({includeDev: true}))
        .pipe(gulp.dest(toFolder));
}
