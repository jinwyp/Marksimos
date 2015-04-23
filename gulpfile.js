
var gulp = require('gulp'),
    argv = require('yargs').usage('Usage: $0 -p [num] -sid [num]').example('$0 -p 1 -sid 10001', 'count the lines in the given file').argv;
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
    sassSourceFiles: ['./public/app/css/sass/*.scss','./public/app/css/sass/*/*.scss','./public/app/css/sass/*/*/*.scss'],
    cssSourceFiles: './public/app/css/stylesheets/marksimosmain.css',
    cssOutputPath: './public/app/css/stylesheets',
    cssDistPath: './public/app/css/distcss/',
    sasspath: 'public/app/css/sass',  // removed the dot-slash from here  './public/app/css/sass' wrong format
    imagespath : './public/app/css/images',

    cssSourcePathMarksimos: ['./public/app/css/stylesheets/screen.css', './public/libs/angular-notify/dist/angular-notify.css', './public/libs/bootstrap/dist/css/bootstrap.min.css', './public/app/css/stylesheets/marksimosmain.css', './public/app/css/stylesheets/print.css', './public/app/css/stylesheets/ie.css', './public/libs/nvd3/nv.d3.css'],
    cssSourcePathB2C: [ './public/libs/bootstrap/dist/css/bootstrap.min.css', './public/libs/angular-motion/dist/angular-motion.min.css', './public/app/css/stylesheets/b2cmain.css'],
    unit_test: './api/test/marksimos/*',
    scenario_testAdminCreateSeminar: './api/test/marksimos/scenario/admincreateseminar.js',
    scenario_testAdminRunSeminarNextRound: './api/test/marksimos/scenario/adminrunseminarnextround.js',
    scenario_testAdminReRunSeminar: './api/test/marksimos/scenario/adminrerundecision.js',
    scenario_testStudentUpdateDecisions: './api/test/marksimos/scenario/studentupdatedecision.js',
    scenario_testStudentUpdateQuestionnaire: './api/test/marksimos/scenario/studentupdatequestionnaire.js'

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
        .pipe(livereload());

});


// 合并css 并压缩
gulp.task('minifycssMarksimos', function() {
    gulp.src(paths.cssSourcePathMarksimos)
        .pipe(concat('appmarksimos.min.css'))
        .pipe(minifyCSS({
            keepBreaks:false,
            keepSpecialComments:0 //* for keeping all (default), 1 for keeping first one only, 0 for removing all
        }))
        .pipe(gulp.dest(paths.cssDistPath))
});
gulp.task('minifycssB2C', function() {
    gulp.src(paths.cssSourcePathB2C)
        .pipe(concat('appb2c.min.css'))
        .pipe(minifyCSS({
            keepBreaks:false,
            keepSpecialComments:0 //* for keeping all (default), 1 for keeping first one only, 0 for removing all
        }))
        .pipe(gulp.dest(paths.cssDistPath))
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
gulp.task('nodemonken', function () {
  nodemon({
    script: 'app.js',
    env: { 'NODE_ENV': 'ken' }
  });
});
gulp.task('nodemonjin', function () {
    nodemon({
        script: 'app.js',
        env: { 'NODE_ENV': 'jin' }
    });
//        .on('restart', 'default')
});
gulp.task('nodemonjinlocal', function () {
    nodemon({
        script: 'app.js',
        env: { 'NODE_ENV': 'jinlocal' }
    });
//        .on('restart', 'default')
});

gulp.task('nodemonyuekecheng', function () {
    nodemon({
        script: 'app.js',
        env: { 'NODE_ENV': 'yuekecheng' }
    });
//        .on('restart', 'default')
});


/********************  Rerun the task when a file changes  ********************/

gulp.task('watch', function() {
    gulp.watch(paths.angularTemplates, ['templates']);
    gulp.watch(paths.sassSourceFiles, ['compass']);
    gulp.watch(paths.cssSourceFiles, ['minifycssMarksimos']);
    gulp.watch(paths.cssSourceFiles, ['minifycssB2C']);
    gulp.watch(paths.javascript, ['jscompress']);
});




gulp.task('watchdev', function() {
    livereload.listen();
    gulp.watch(paths.angularTemplates, ['templates']);
    gulp.watch(paths.sassSourceFiles, ['compass']);
    gulp.watch(paths.javascript, ['jshint']);
});



// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:3009"
    });
});















/********************  场景测试任务 API Testing Task (called when you run `gulp` from cli)  ********************/
gulpArguments = argv;
gulp.task('teststudentud', function() {
    console.log("Pls use 'gulp teststudentud -p -s'. Argument '-p' peroid number, Argument '-s' seminarId argument. ");
    console.log("Example: 'gulp teststudentud -s10001 -p1' ");
    return gulp.src(paths.scenario_testStudentUpdateDecisions)
        .pipe(jasmine());
});
gulp.task('teststudentuq', function() {
    return gulp.src(paths.scenario_testStudentUpdateQuestionnaire)
        .pipe(jasmine());
});

gulp.task('testadmincs', function() {
    return gulp.src(paths.scenario_testAdminCreateSeminar)
        .pipe(jasmine());
});
gulp.task('testadminrn', function() {
    console.log("Pls use 'gulp testadminrn -p -s'. Argument '-p' peroid number, Argument '-s' seminarId argument. ");
    console.log("Example: 'gulp testadminrn -s10001' ");
    return gulp.src(paths.scenario_testAdminRunSeminarNextRound)
        .pipe(jasmine());
});
gulp.task('testadminrr', function() {
    console.log("Pls use 'gulp testadminrr -p -s'. Argument '-p' peroid number, Argument '-s' seminarId argument. ");
    console.log("Example: 'gulp testadminrr -s10001 -p1' ");
    return gulp.src(paths.scenario_testAdminReRunSeminar)
        .pipe(jasmine());
});




/********************  默认任务 he default task (called when you run `gulp` from cli)  ********************/

gulp.task('default', ['nodemonludwik', 'watchdev']);

//gulp.task('jin', ['mongo', 'browser-sync', 'nodemonjin', 'watch']);
gulp.task('ken', [ 'compass', 'templates', 'nodemonken', 'watchdev']);
gulp.task('jin', [ 'compass', 'templates', 'nodemonjin', 'watchdev']);
gulp.task('jinco', ['compass', 'templates', 'nodemonjinlocal', 'watchdev']);
gulp.task('jinpro', ['compass', 'templates', 'minifycssMarksimos', 'minifycssB2C', 'jscompress', 'nodemonjin', 'watch']);
gulp.task('yuekecheng', [ 'compass', 'templates', 'nodemonyuekecheng', 'watchdev']);







