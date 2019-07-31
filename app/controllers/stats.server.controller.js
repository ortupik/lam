
exports.getSuperAdminStats = function(connection,data,callback) { 
	 var query = connection.query("Select (SELECT count(*) FROM `company` ) as noc, (Select count(*) FROM `users`) as nou, '---' as nhw,'---' as tsc",[],function(err, rows, fields) {
      if (!err){
           callback({message:'Got The Super Admin Stats', success:1, data:rows});  
      }else{
      	console.log(err);
      	callback({message:"Could not retrive super admin stats !!", success:0, error_code:65757579});
      }

   });
  
}

exports.getCompanyAdminStats = function(connection,data,callback) { 
	 var query = connection.query("Select (SELECT count(*) FROM `company` ) as noc, (Select count(*) FROM `users`) as nou, '---' as nhw,'---' as tsc, '---' as tos, '---' as sd",[],function(err, rows, fields) {
      if (!err){
           callback({message:'Got The Super Admin Stats', success:1, data:rows});  
      }else{
      	console.log(err);
      	callback({message:"Could not retrive super admin stats !!", success:0, error_code:65757579});
      }

   });
 
}

exports.getCompanyInfoStats = function(connection,data,callback) { 
   var query = connection.query('Select company_tier, (SELECT count(*) FROM `users` WHERE  company_id = ? AND (role = "1" OR  role = "2")) as noa,(SELECT count(*) FROM `users` WHERE company_id = ? AND (role = "3" OR  role = "4" OR  role = "5" ) ) as nom,(SELECT count(*) FROM `users` WHERE role = "6" and company_id = ? ) as noe from company where company_id = ?',[data.company_id,data.company_id,data.company_id,data.company_id],function(err, rows, fields) {
      if (!err){
        callback({data:{company_tier:rows[0]['company_tier'],noa:rows[0]['noa'],noe:rows[0]['noe'],nom:rows[0]['nom']},success:1});  
      }else{
        console.log(err);
        callback({message:"Could not retrive company stats !!", success:0, error_code:203});
      }

   });
}
