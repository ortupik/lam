
module.exports = function(app,connection) {

	var stats = require('../../app/controllers/stats.server.controller');  

	app.get('/stats/getStats', function(req, res, next) {
		
	  // var role = "Super Admin"; //get this from session	
	   var role = "Company Admin";

	   if(role == "Super Admin"){
	   	  stats.getSuperAdminStats(connection,{},function(resp){
	        res.json(resp);
		 });
	   }else if(role == "Company Admin"){
          stats.getCompanyAdminStats(connection,{},function(resp){
	        res.json(resp);
		  });
	   }
	   
	});

}