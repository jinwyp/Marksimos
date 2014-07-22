var should = require('should');
var chartController = require('../../controllers/chart.js');

var req = {};
req.session = {};

var res = {};

describe('/api/chart/:chart_name', function(){
    it('should return right data', function(done){
        req.session.seminarId = '10000';
        res.send = function(status, data){
            status.should.equal(500);
            done();
        }
        chartController.getChart(req, res);

        
    })
})