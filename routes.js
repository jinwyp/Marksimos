module.exports = function(app){
     app.get('/', function(req, res, next){
        res.render('index.ejs', {});
    });
     
    app.get('/login', function(req, res, next){
        res.render('login.ejs', {});
    });

    app.get('/mainhome', function(req, res, next){
        res.render('usermainhome.ejs', {});
    });

    app.get('/report', function(req, res, next){
        res.render('userreport.ejs', {});
    });


    app.get('/admin', function(req, res, next){
        res.render('adminhome.ejs', {});
    });
};