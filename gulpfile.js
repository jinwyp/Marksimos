
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    mocha = require('gulp-mocha'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    ngAnnotate = require('gulp-ng-annotate'),
    minifyHtml = require("gulp-minify-html"),
    ngTemplateCache = require('gulp-angular-templatecache'),
    jasmine = require('gulp-jasmine'),
    childProcess = require('child_process');

var customReportor = require('./api/test/customReportor.js');

var paths = {
    base: './public',
    app: './public/app/**',
    views: './views/**',
    javascript: './public/app/js/*.js',
    javascriptPath: './public/app/js/',
    javascriptOutputDist: './public/app/dist/',
    angularTemplates: ['./public/app/js/commoncomponent/*.html', './public/app/js/report/*.html', './public/app/js/websitecomponent/*.html'],

    compass_config : './public/app/css/config.rb',
    sassSourceFiles: './public/app/css/sass/*.scss',
    cssSourceFiles: './public/app/css/stylesheets/marksimosmain.css',
    cssOutputPath: './public/app/css/stylesheets',
    sasspath: 'public/app/css/sass',  // removed the dot-slash from here  './public/app/css/sass' wrong format
    imagespath : './public/app/css/images',

    cssSourcePath: ['./public/app/css/stylesheets/screen.css', './public/libs/bootstrap/dist/css/bootstrap.min.css', './public/app/css/stylesheets/marksimosmain.css', './public/app/css/stylesheets/print.css', './public/app/css/stylesheets/ie.css', './public/libs/nvd3/nv.d3.css', './public/libs/angular-notify/dist/angular-notify.css'],
    unit_test: './api/test/marksimos/*',
    scenario_testAdmin: './api/test/marksimos/admin/*.js',
    scenario_testStudent: './api/test/marksimos/student/*.js'

};




/********************  Creat Gulp Task  ********************/

// 合并 angular directive template
gulp.task('templates', function () {
    gulp.src(paths.angularTemplates)
        .pipe(minifyHtml({
//            empty: true, //do not remove empty attributes
//            spare: true, //do not remove redundant attributes
            quotes: true
        }))
        .pipe(ngTemplateCache('directivetemplates.js', { module:'marksimos.templates', standalone:true }))
        .pipe(gulp.dest(paths.javascriptPath));
});


// 监视JS文件的变化 并用jshint 检查语法 注: jshint 可能会伤害你的感情
gulp.task('jshint',function(){
    gulp.src(paths.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


// Minify JavaScript with UglifyJS2.
gulp.task('jscompress',function(){
    gulp.src(paths.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(ngAnnotate())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.javascriptOutputDist))
});



// 监视scss文件的变化
gulp.task('compass', function() {
    gulp.src(paths.sassSourceFiles)
        .pipe(compass({
            css : paths.cssOutputPath,
            sass : paths.sasspath,
            image : paths.imagespath,
            style : 'expanded',  //The output style for the compiled css. One of: nested, expanded, compact, or compressed.
            comments : false
        }))
        .pipe(gulp.dest(paths.cssOutputPath))

});


// 合并css 并压缩
gulp.task('minifycss', function() {
    gulp.src(paths.cssSourcePath)
        .pipe(concat('app.min.css'))
        .pipe(minifyCSS({
            keepBreaks:false,
            keepSpecialComments:0 //* for keeping all (default), 1 for keeping first one only, 0 for removing all
        }))
        .pipe(gulp.dest(paths.cssOutputPath))
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


// 运行测试
gulp.task('mocha', function () {
    gulp.watch(paths.unit_test, ['mocha']);
    return gulp.src(paths.unit_test, {read: false})
        .pipe(mocha({reporter: 'nyan', timeout: 2000}));
});




/********************  使用nodemon 自动重启服务器  ********************/

gulp.task('nodemonludwik', function () {
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
gulp.task('nodemonsunyun', function () {
    nodemon({
        script: 'app.js',
        env: { 'NODE_ENV': 'sunyun' }
    });
//        .on('restart', 'default')
});



/********************  Rerun the task when a file changes  ********************/

gulp.task('watch', function() {
    gulp.watch(paths.angularTemplates, ['templates']);
    gulp.watch(paths.sassSourceFiles, ['compass']);
    gulp.watch(paths.cssSourceFiles, ['minifycss']);
    gulp.watch(paths.javascript, ['jscompress']);

//    var server = livereload();
//    gulp.watch(paths.app).on('change', function(file) {
//        server.changed(file.path);
//    });
//    gulp.watch(paths.views).on('change', function(file) {
//        server.changed(file.path);
//    });
});




gulp.task('watchdev', function() {
    gulp.watch(paths.angularTemplates, ['templates']);
    gulp.watch(paths.sassSourceFiles, ['compass']);
    gulp.watch(paths.cssSourceFiles, ['minifycss']);
    gulp.watch(paths.javascript, ['jshint']);
});



// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:3009"
    });
});



gulp.task('teststudent', function() {
    return gulp.src(paths.scenario_testStudent)
        .pipe(jasmine());
});

gulp.task('testadmin', function() {
    return gulp.src(paths.scenario_testAdmin)
        .pipe(jasmine());
});



/********************  默认任务 he default task (called when you run `gulp` from cli)  ********************/

gulp.task('default', ['nodemonludwik', 'watchdev']);

//gulp.task('jin', ['mongo', 'browser-sync', 'nodemonjin', 'watch']);
gulp.task('jin', [ 'compass', 'templates', 'nodemonjin', 'watchdev']);
gulp.task('jingo', ['compass', 'templates', 'nodemonjin', 'watch']);

gulp.task('sunyun', ['nodemonsunyun', 'watchdev']);


