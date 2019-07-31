
exports.createCompany = function(connection,data,callback) {
	var query = connection.query('INSERT INTO company SET ?', data, function (err, result) {
	    console.log(query.sql)
	    if (!err) {
	        console.log("inserted company")
	        callback({success:1, data:result});
	    } else {
	        console.log(err);
	        callback({success: 0, message:'Could Not Register Company !'});
	    }
	});

}

exports.getCompanyStats = function(connection,data,callback) { 
	 var query = connection.query("SELECT * FROM `company`  ",[],function(err, rows, fields) {
      if (!err){
           callback({message:'Got The Company Data', success:1, data:{num_co:rows.length}});  
      }else{
      	console.log(err);
      	callback({message:"Could not retrive company stats !!", success:0, error_code:203});
      }

   });
}

exports.getCompanyNameList = function(connection,data,callback) { 
	 var query = connection.query("SELECT company_id,company_name FROM `company`  ",[],function(err, rows, fields) {
      if (!err){
      	    var companyData = [];
      	    for(var i = 0; i < rows.length; i++){
      	    	companyData.push({id:rows[i]["company_id"], name:rows[i]["company_name"]});
      	    }
           callback({message:'Got The Company Name List Data', success:1, data:companyData});  
      }else{
      	console.log(err);
      	callback({message:"Could not retrive company name list  !!", success:0, error_code:204});
      }

   });

}