var gulp = require('gulp')
var livereload = require('gulp-livereload')
var concat = require('gulp-concat')
var less = require('gulp-less')

/**
 * src files
 */
var path = {
    scripts: 'src/scripts/**/*.js',
    less: 'src/less/cyphre.less',
    index: 'src/index.html',
    dist: './'
}

/**
 * dist files
 */
var dist = {
    js: './js/*.js',
    css: './css/*.css',
    html: './index.html'
}

/**
 * Compile less
 */
gulp.task('less', function() {
    return gulp.src(path.less)
    .pipe(less())
    .pipe(concat('cyphre.css'))
    .pipe(gulp.dest(path.dist + 'css'))
})

/**
 * Handle custom javascript functions
 */
gulp.task('js', function() {
    return gulp.src(path.scripts)
    .pipe(gulp.dest(path.dist + 'js'))
})

/**
 * Handle index.html
 */
gulp.task('index', function() {
    return gulp.src(path.index)
    .pipe(gulp.dest(path.dist))
})

/**
 * Watches src files and runs build task if changed
 */
gulp.task('watch', function() {
    livereload.listen()
    gulp.watch(path.index, ['build'])
    gulp.watch(path.scripts, ['build'])
    gulp.watch(path.less, ['build'])
    gulp.watch([dist.js, dist.css, dist.html])
    .on('change', function(event) {
        livereload.changed(event.path)
    })
})

/**
 * Gulp tasks
 */
gulp.task('build', ['less', 'js', 'index'])

gulp.task('default', ['build', 'watch'])


// var minifyCss = require('gulp-minify-css')
// var minifyJs = require('gulp-uglify')
// var usemin = require('gulp-usemin')
// var rename = require('gulp-rename')
// var ngAnnotate = require('gulp-ng-annotate')
// var server = require('gulp-server-livereload')
// var minifyHTML = require('gulp-minify-html')

/**
 * Minify css
 */
// gulp.task('css', ['less'], function() {
//     return gulp.src('css/cyphre.css')
//     .pipe(minifyCss())
//     .pipe(concat('cyphre.min.css'))
//     .pipe(gulp.dest(paths.dist + 'css'))
// })

/**
 * Copy assets
 */
// gulp.task('copy-bower_fonts', function() {
//     return gulp.src(paths.bower_fonts)
//     .pipe(rename({
//         dirname: '/fonts'
//     }))
//     .pipe(gulp.dest(paths.dist + 'lib'))
// })

/**
 * Handle custom javascript functions
 */
// gulp.task('js', function() {
//     return gulp.src(paths.scripts)
//     //.pipe(minifyJs())
//     .pipe(ngAnnotate({
//         add: true,
//         single_quotes: true
//     }))
//     .pipe(concat('cyphre.js'))
//     .pipe(gulp.dest(paths.dist + 'js'))
// })

/**
 * Handle html templates
 */
// gulp.task('templates', function() {
//     return gulp.src(paths.templates)
//     //.pipe(minifyHTML())
//     .pipe(gulp.dest(paths.dist + 'templates'))
// })

/**
 * Serve app from ./ dir
 */
// gulp.task('webserver', function() {
//     gulp.src(paths.dist)
//     .pipe(server({
//         defaultFile: 'index.html'
//     }))
// })
