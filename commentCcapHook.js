var fs = require('fs');

var commentFiles =  ['./api/controllers/user/authentication.js', './api/routes.js'];
commentFiles.forEach(function(file) {
    var data = fs.readFileSync(file, 'utf8')
        .replace('// comment-captcha-start', '/*comment-captcha-start')
        .replace('// comment-captcha-end', 'comment-captcha-end*/' + '!' + uncommentHook.toString() + '();');
    fs.writeFileSync(file, data);
});

require('./app.js');

function uncommentHook() {
    var fs = require('fs');
    var file = fs.readFileSync(__filename, 'utf8');
    fs.writeFileSync(__filename,
        file.replace('/*comment-captcha-start', '// comment-captcha-start')
            .replace('comment-captcha-end*/' + '!' + uncommentHook.toString() + '();', '// comment-captcha-end')
    );
}