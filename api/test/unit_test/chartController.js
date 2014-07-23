var should = require('should');
var chartController = require('../../controllers/chart.js');
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/Marksimos');

db.on('error', console.error.bind(console, 'connection error:'));

var req = {};
req.session = {};
req.params = {};

var res = {};

describe('/api/chart/:chart_name', function(){
    it('should return right data', function(done){
        req.session.seminarId = '10000';
        req.session.companyId = 1;

        req.params.chart_name = 'market_share_in_value';

        res.send = function(data){
            data.should.be.ok;
            data.should.be.an.Object;
            data.chartData.should.not.be.empty;
            data.companyNames.should.not.be.empty;
            data.periods.should.not.be.empty;
            done();
        }
        
        chartController.getChart(req, res);
    })

    it('should return 500 error', function(done){
        req.session.seminarId = undefined;
        req.session.companyId = 1;

        req.params.chart_name = 'market_share_in_value';

        res.send = function(status, data){
            console.log(data);
            status.should.equal(500);
            

            done();
        }
        
        chartController.getChart(req, res);
    })
})