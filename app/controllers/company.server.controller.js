
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
	 var query = connection.query("SELECT count(t1.company_id) as num_co FROM `company`  t1  JOIN users t2 ON t1.company_id = t2.company_id WHERE t2.user_id = ?  ",[data.user_id],function(err, rows, fields) {
      if (!err){
           callback({message:'Got The Company Data', success:1, data:{num_co:rows[0]["num_co"]}});  
      }else{
      	console.log(err);
      	callback({message:"Could not retrive company stats !!", success:0, error_code:203});
      }

   });
}

exports.getCompanyNameList = function(connection,data,callback) { 
	 var query = connection.query("SELECT t1.company_id,company_name FROM `company`  t1  JOIN users t2 ON t1.company_id = t2.company_id WHERE t2.user_id = ? ",[data.user_id],function(err, rows, fields) {
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