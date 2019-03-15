var gulp = require('gulp');
var $ = require('gulp-load-plugins')({rename: {'gulp-rev-delete-original':'revdel', 'gulp-if': 'if'}});

/* Base */
gulp.task('copy', function() {
    return gulp.src(['src/assets/{img,font}/**/*', 'src/app.yaml'], {base: 'src'})
        .pipe(gulp.dest('docs'));
});

gulp.task('clean', function() {
    return gulp.src('docs/', {read: false})
        .pipe($.clean());
});

/* Minificação */
gulp.task('minify-js', function() {
  return gulp.src('src/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('docs/'))
});

gulp.task('minify-css', function() {
  return gulp.src('src/**/*.css')
    .pipe($.cssnano({safe: true}))
    .pipe(gulp.dest('docs/'))
});

gulp.task('minify-html', function() {
  return gulp.src('src/**/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('docs/'))
});

/* Concat */
gulp.task('useref', function () {
    return gulp.src('src/index.html')
        .pipe($.useref())
        .pipe($.if('*.html', $.inlineSource()))
        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({safe: true})))
        .pipe(gulp.dest('docs'));
});

/* Gera versão de assets */
gulp.task('rev', function(){
  return gulp.src(['docs/**/*.{css,js,jpg,jpeg,png,svg}'])
    .pipe($.rev())
    .pipe($.revdel())
    .pipe(gulp.dest('docs/'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('docs/'))
})

gulp.task('revreplace', ['rev'], function(){
  return gulp.src(['docs/index.html', 'docs/app.yaml', 'docs/**/*.css'])
    .pipe($.revReplace({
        manifest: gulp.src('docs/rev-manifest.json'),
        replaceInExtensions: ['.html', '.yaml', '.js', '.css']
    }))
    .pipe(gulp.dest('docs/'));
});

/* Alias */
gulp.task('minify', ['minify-js', 'minify-css', 'minify-html']);
gulp.task('build', $.sequence(['minify-js', 'minify-css'], 'useref', 'revreplace'));
gulp.task('default', $.sequence('clean', 'copy', 'build'));