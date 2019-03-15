var gulp = require('gulp');
var $ = require('gulp-load-plugins')({rename: {'gulp-rev-delete-original':'revdel', 'gulp-if': 'if'}});

/* Base */
gulp.task('copy', function() {
    return gulp.src(['src/assets/{img,font}/**/*', 'src/app.yaml'], {base: 'src'})
        .pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
    return gulp.src('public/', {read: false})
        .pipe($.clean());
});

/* Minificação */
gulp.task('minify-js', function() {
  return gulp.src('src/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('public/'))
});

gulp.task('minify-css', function() {
  return gulp.src('src/**/*.css')
    .pipe($.cssnano({safe: true}))
    .pipe(gulp.dest('public/'))
});

gulp.task('minify-html', function() {
  return gulp.src('src/**/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public/'))
});

/* Concat */
gulp.task('useref', function () {
    return gulp.src('src/index.html')
        .pipe($.useref())
        .pipe($.if('*.html', $.inlineSource()))
        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({safe: true})))
        .pipe(gulp.dest('public'));
});

/* Gera versão de assets */
gulp.task('rev', function(){
  return gulp.src(['public/**/*.{css,js,jpg,jpeg,png,svg}'])
    .pipe($.rev())
    .pipe($.revdel())
    .pipe(gulp.dest('public/'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('public/'))
})

gulp.task('revreplace', ['rev'], function(){
  return gulp.src(['public/index.html', 'public/app.yaml', 'public/**/*.css'])
    .pipe($.revReplace({
        manifest: gulp.src('public/rev-manifest.json'),
        replaceInExtensions: ['.html', '.yaml', '.js', '.css']
    }))
    .pipe(gulp.dest('public/'));
});

/* Alias */
gulp.task('minify', ['minify-js', 'minify-css', 'minify-html']);
gulp.task('build', $.sequence(['minify-js', 'minify-css'], 'useref', 'revreplace'));
gulp.task('default', $.sequence('clean', 'copy', 'build'));