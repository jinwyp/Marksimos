
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    compass = require('gulp-compass'),
    mocha = require('gulp-mocha'),
    uglify = require('gulp-uglify'),
    childProcess = require('child_process');



var paths = {
    app: './public/app/**',
    views: './views/**',
    javascript: './public/app/js/*.js',
    javascriptOutputDist: './public/app/dist/',

    compass_config : './public/app/css/config.rb',
    sassfiles: './public/app/css/sass/*.scss',
    csspath: './public/app/css/stylesheets',
    sasspath: './public/app/css/sass',
    imagespath : './public/app/css/images',
    csspathOutput: './public/app/css/stylesheets',

    unit_test: './api/test/unit_test/*'
};




/********************  Creat Gulp Task  ********************/

// 监视JS文件的变化 并用jshint 检查语法 注: jshint 可能会伤害你的感情
gulp.task('jshint',function(){
    gulp.src(paths.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


// Minify JavaScript with UglifyJS2.
gulp.task('jscompress',function(){
    gulp.src(paths.javascript)
        .pipe(uglify())
        .pipe(gulp.dest(paths.javascriptOutputDist))
});


// 监视scss文件的变化 目前没有使用该任务,用的是Ruby的compass
gulp.task('compass', function() {
    gulp.src(paths.sassfiles)
        .pipe(compass({
            css : paths.csspath,
            sass : paths.sasspath,
            image : paths.imagespath,
            style : 'compressed',  //The output style for the compiled css. One of: nested, expanded, compact, or compressed.
            comments : true
        }))
        .pipe(gulp.dest(paths.csspathOutput))
});


// 启动 Mongo DB
gulp.task('mongo', function() {

//    childProcess.exec('mongo --eval "db.getSiblingDB("admin").shutdownServer()"', function(error, stdout, stderr){
//        console.log('stdout: ' + stdout);
//        console.log('stderr: ' + stderr);
//        if (error !== null) {
//            console.log('exec error: ' + error);
//        }
//    });

    childProcess.exec('mongo admin --eval "db.shutdownServer()"', function(error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }

        childProcess.exec('mongod --config /usr/local/etc/mongod.conf', function(error, stdout, stderr){
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        })
    });


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
    gulp.watch(paths.javascript, ['jscompress']);

//    var server = livereload();
//    gulp.watch(paths.app).on('change', function(file) {
//        server.changed(file.path);
//    });
//    gulp.watch(paths.views).on('change', function(file) {
//        server.changed(file.path);
//    });
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

gulp.task('jin', ['mongo', 'nodemonjin', 'watch']);

