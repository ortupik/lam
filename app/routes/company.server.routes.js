
module.exports = function(app,connection) {

	var company = require('../../app/controllers/company.server.controller');  
	var stats = require('../../app/controllers/stats.server.controller');  

	app.post('/company/create_company', function(req, res, next) {
	   company.createCompany(connection,req.body,function(resp){
	      res.json(resp);
		});
	});

	app.post('/company/getCompanyStats', function(req, res, next) {
	   company.getCompanyStats(connection,req.body,function(resp){
	      res.json(resp);
		});
	});

	app.get('/company/getCompanyNameList', function(req, res, next) {
	   company.getCompanyNameList(connection,null,function(resp){
	      res.json(resp);
		});
	});

    app.post('/stats/getCompanyInfoStats', function(req, res, next) {
	   stats.getCompanyInfoStats(connection,req.body,function(resp){
	      res.json(resp);
		});
	});
	

}