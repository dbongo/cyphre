var gulp = require('gulp')
var usemin = require('gulp-usemin')
var livereload = require('gulp-livereload')
var minifyCss = require('gulp-minify-css')
var minifyJs = require('gulp-uglify')
var concat = require('gulp-concat')
var less = require('gulp-less')
var rename = require('gulp-rename')
var ngAnnotate = require('gulp-ng-annotate')
//var server = require('gulp-server-livereload')
//var minifyHTML = require('gulp-minify-html')

var paths = {
    scripts: 'src/scripts/**/*.*',
    styles: 'src/less/cyphre.less',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'src/vendor/**/*.{ttf,woff,eof,svg}',
    dist: './'
}
var app = {
    js: './js/*.js',
    css: './css/*.css',
    html: './index.html'
}

/**
 * Compile less
 */
gulp.task('less', function() {
    return gulp.src(paths.styles)
    .pipe(less())
    .pipe(concat('cyphre.css'))
    .pipe(gulp.dest(paths.dist + 'css'))
})

/**
 * Minify css
 */
gulp.task('css', ['less'], function() {
    return gulp.src('css/cyphre.css')
    .pipe(minifyCss())
    .pipe(concat('cyphre.min.css'))
    .pipe(gulp.dest(paths.dist + 'css'))
})

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
    .pipe(usemin({
        js: [minifyJs(), 'concat'],
        css: [minifyCss(), 'concat']
    }))
    .pipe(gulp.dest(paths.dist))
})

/**
 * Copy assets
 */
gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
    .pipe(rename({
        dirname: '/fonts'
    }))
    .pipe(gulp.dest(paths.dist + 'lib'))
})

/**
 * Handle custom javascript functions
 */
gulp.task('js', function() {
    return gulp.src(paths.scripts)
    //.pipe(minifyJs())
    .pipe(ngAnnotate({
        add: true,
        single_quotes: true
    }))
    .pipe(concat('cyphre.js'))
    .pipe(gulp.dest(paths.dist + 'js'))
})

/**
 * Handle html templates
 */
gulp.task('templates', function() {
    return gulp.src(paths.templates)
    //.pipe(minifyHTML())
    .pipe(gulp.dest(paths.dist + 'templates'))
})

/**
 * Watches src files and runs build task if changed
 */
gulp.task('watch', function() {
    livereload.listen()
    gulp.watch(paths.index, ['build'])
    gulp.watch(paths.scripts, ['build'])
    gulp.watch(paths.styles, ['build'])
    gulp.watch(paths.templates, ['build'])
    gulp.watch([app.js, app.css, app.html])
    .on('change', function(event) {
        livereload.changed(event.path)
    })
})

/**
 * Serve app from ./ dir
 */
// gulp.task('webserver', function() {
//     gulp.src(paths.dist)
//     .pipe(server({
//         defaultFile: 'index.html'
//     }))
// })

/**
 * Gulp tasks
 */
gulp.task('build', ['css', 'js', 'templates', 'copy-bower_fonts', 'usemin'])
gulp.task('default', ['build', 'watch'])
