
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass');


var paths = {
    js: './app/js/*.js',
    sass: './app/css/sass/*.scss'
};


//监视我们JS文件的变化
gulp.task('jshint',function(){
    gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//监视scss文件的变化
gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('./app/css/stylesheets/'))
});


gulp.task('nodemon', function () {
    nodemon({ script: 'app.js'})
        .on('restart', 'default')
});


// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['jshint']);
    gulp.watch(paths.sass, ['sass']);
});



//默认任务
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['jshint', 'sass', 'watch']);