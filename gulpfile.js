
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    compass = require('gulp-compass');
    mocha = require('gulp-mocha');

var paths = {
    app: './public/app/**',
    views: './views/**',
    javascript: './public/app/js/*.js',

    compass_config : './public/app/css/config.rb',
    sassfiles: './public/app/css/sass/*.scss',
    csspath: './public/app/css/stylesheets',
    sasspath: './public/app/css/sass',
    imagespath : './public/app/css/images',
    target_csspath: './public/app/css/stylesheets',

    unit_test: './api/test/unit_test/*'
};




/********************  Creat Gulp Task  ********************/

// 监视JS文件的变化
gulp.task('jshint',function(){
    gulp.src(paths.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


// 监视scss文件的变化 目前没有开启compass
gulp.task('compass', function() {
    gulp.src(paths.sassfiles)
        .pipe(compass({
            css : paths.csspath,
            sass : paths.sasspath,
            image : paths.imagespath,
            style : 'nested',  //The output style for the compiled css. One of: nested, expanded, compact, or compressed.
            comments : true
        }))
        .pipe(gulp.dest(paths.target_csspath))
});


// 使用nodemon 自动重启服务器
gulp.task('nodemon', function () {
    nodemon({
        script: 'app.js',
        env: { 'NODE_ENV': 'ludwik' }
    });
//        .on('restart', 'default')
});

gulp.task('nodemonraven', function () {
    nodemon({
        script: 'app.js',
        env: { 'NODE_ENV': 'raven' }
    });
});

gulp.task('nodemonjin', function () {
    nodemon({
        script: 'app.js',
        env: { 'NODE_ENV': 'jin' }
    });
//        .on('restart', 'default')
});




// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.javascript, ['jshint']);
    //gulp.watch(paths.sassfiles, ['compass']);

    var server = livereload();
    gulp.watch(paths.app).on('change', function(file) {
        server.changed(file.path);
    });
    gulp.watch(paths.views).on('change', function(file) {
        server.changed(file.path);
    });
});






// 运行测试
gulp.task('mocha', function () {
    gulp.watch(paths.unit_test, ['mocha']);
    return gulp.src(paths.unit_test, {read: false})
        .pipe(mocha({reporter: 'nyan', timeout: 2000}));
});




// 默认任务
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['nodemon', 'watch']);

gulp.task('jin', ['nodemonjin', 'watch']);

