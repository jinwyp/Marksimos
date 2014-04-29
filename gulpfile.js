
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    compass = require('gulp-compass');

var paths = {
    app: './public/app/**',
    views: './views/**',
    javascript: './public/app/js/*.js',
    compass_config : './public/app/css/config.rb',
    sassfiles: './public/app/css/sass/*.scss',
    sasspath: './public/app/css/sass',
    target_csspath: './public/app/css/stylesheets',
    imagespath : './public/app/css/images'
};


// 监视JS文件的变化
gulp.task('jshint',function(){
    gulp.src(paths.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


// 监视scss文件的变化
gulp.task('compass', function() {
    gulp.src(paths.sassfiles)
        .pipe(compass({
            css : paths.target_csspath,
            sass : paths.sasspath,
            images : paths.imagespath,
            style : 'nested',  //The output style for the compiled css. One of: nested, expanded, compact, or compressed.
            comments : true
        }))
        .pipe(gulp.dest(paths.target_csspath))
});


// 自动重启服务器
gulp.task('nodemon', function () {
    nodemon({ script: 'app.js'})
//        .on('restart', 'default')
});


// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.javascript, ['jshint']);
    gulp.watch(paths.sassfiles, ['compass']);

    var server = livereload();
    gulp.watch(paths.app).on('change', function(file) {
        server.changed(file.path);
    });
    gulp.watch(paths.views).on('change', function(file) {
        server.changed(file.path);
    });
});


// 默认任务
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['nodemon', 'compass', 'watch']);

