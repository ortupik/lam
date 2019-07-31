'use strict';

const nodemailer = require("nodemailer");

/**
 * Signin 
 */
exports.signin = function(connection,userData,callback) { 

    var query = connection.query("SELECT * FROM `users` WHERE ? AND ?  ",[{password:userData.password},{email:userData.email}],function(err, rows, fields) {

      if (!err){
          if(rows.length > 0){

          	  var user = rows[0];

          	  generateAccessCode(connection,user, function(resp){
                 if(resp.success == 1){
                     callback({message:'Successful Login', success:1, user:user});
                 }else{
                      callback({message:"Could not log you in at this time, try again later", success:0, error_code:102});
                 }
          	  });
              
          }else{
             callback({message:"Invalid Email or Password !!", success:0, error_code:101});
          }
      }else{
      	console.log(err);
      	callback({message:"Could not Log In at this time !!", success:0, error_code:103});
      }

   });

};
exports.getUserSigned = function(connection,signup_code,callback) { 

    var query = connection.query("SELECT * FROM `users` WHERE signup_code = ?",[signup_code],function(err, rows, fields) {
      if (!err){
          if(rows.length > 0){
              var user = rows[0];
              callback({success:1,data:{first_name:user.fname}})
          }else{
             callback({ success:0});
          }
      }else{
        console.log(err);
        callback({success:0});
      }

   });

};
/**
  generate sign up password
**/
exports.updateSignUpPassword = function(connection,data,callback){

     var query = connection.query('UPDATE users SET ? , ? WHERE ?',[{password:data.password},{authorized_login:'Y'},{signup_code:data.signup_code}], function(err, result) {
     console.log(query.sql);

     if(!err){
        if(result.changedRows > 0){
           callback({success:1})
         }else{
            callback({success:0, error_code:"usp1", message:"Invalid Sign Up Code!"});
         }
     }else{
       console.log(err);
       callback({success:0, error_code:"usp2", message:"Could Not Update Password !"});
     }

 });

}

/**
  Generate Access Code
**/
var generateAccessCode = function(connection,data,callback){

	var access_code = Math.random().toString(36).substr(2, 6);

     var query = connection.query('UPDATE users SET ? WHERE ?',[{access_code:access_code},{user_id:data.user_id}], function(err, result) {
     console.log(query.sql);

     if(!err){
       
     	data.access_code = access_code;

     	sendEmail(data,function(resp){
     		if(resp.success == 1){
     			 callback({success:1})
     		}else{
     			 callback({success:0})
     		}
     	});
      
     }else{
     	callback({success:0})
     }

 });
}

function sendEmail(data,callback){
          
    var email = data.email;
    var fname = data.fname;
    var access_code = data.access_code;

	var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	      user: 'techflay@gmail.com',
	      pass: '#tech.254-flay'
	    }
	});

	var mailOptions = {
		from: "support@lambano.com",
		to:email,
		subject: 'Lambano Access Code',
		html: "Dear "+fname+",<br><br>Please enter the access code below to proceed with sign in. <br><br> Access Code <b>"+access_code+"</b><br><br>Best Regards,<br>Lambano Team"
	};

	transporter.sendMail(mailOptions, function(error, info){
	if (error) {
	  console.log(error);
	  callback({success:0})
	} else {
	  console.log('Email sent: ' + info.response);
	  callback({success:1})
	}
}); 
}

/**
 * Validate Access Code 
 */
exports.validateAccessCode = function(connection,userData,callback) { 

    var query = connection.query("SELECT * FROM `users` WHERE ? AND ?  ",[{access_code:userData.access_code},{email:userData.email}],function(err, rows, fields) {

      if (!err){
          if(rows.length > 0){
          	  callback({message:'Successful validated Access Code', success:1, user:{user_id:rows[0]["user_id"],fname:rows[0]["fname"],role:rows[0]["role"]}});
          }else{
             callback({message:"Invalid Access Code", success:0, error_code:105});
          }
      }else{
      	console.log(err);
      	callback({message:"Could not validate access code at this time !!", success:0, error_code:104});
      }

   });

};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/logout');
};

exports.getUsersStats = function(connection,data,callback) { 

   var query = connection.query("SELECT * FROM `users` WHERE `authorized_login` = 'Y'  ",[],function(err, rows, fields) {

      if (!err){
           callback({message:'Got The Users Data', success:1, data:{num_users:rows.length}});  
      }else{
        console.log(err);
        callback({message:"Could not retrive users stats !!", success:0, error_code:203});
      }

   });

}

exports.createUser = function(connection,data,managerData,callback) { 

  var signup_code = Math.random().toString(36).substr(2, 17);
  var company = data.company;

  var emailData = {
    fname:data.fname,
    signup_code:signup_code,
    email:data.email,
    company:company,
    manager:managerData.fname
  } 
  
  data.signup_code = signup_code;
  data.creater_id = managerData.user_id;

  delete data.company; 

  var query = connection.query('INSERT INTO users SET ?', data, function (err, result) {
      console.log(query.sql)
      if (!err) {
          
          sendSignUpCodeEmail(emailData, function(resp){
             if(resp.success == 1){
               callback({success:1, data:result})
            }else{
               callback({success:0, message:'Could Not Send Email !'})
            }
          });

      } else {
          console.log(err);
          callback({success: 0, message:"Could Not Register User!"});
      }
  });

}

function sendSignUpCodeEmail(data,callback){
          
    var email = data.email;
    var fname = data.fname;
    var signup_code = data.signup_code;
    var manager = data.manager;
    var company = data.company;

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'techflay@gmail.com',
        pass: '#tech.254-flay'
      }
  });

  var signup_url = "https://167.71.131.228/setup_password?signup_code="+signup_code;
  var html = "Dear "+fname+", <br><br> Welcome to Lambano People, you have been added by "+manager+" from "+company+",<br> Please follow this link to activate your account <br> <br> <b> "+signup_url+"</b><br><br>Best Regards,<br>Lambano Team";

  var mailOptions = {
    from: "support@lambano.com",
    to:email,
    subject: 'Lambano Sign Up',
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    callback({success:0})
  } else {
    console.log('Email sent: ' + info.response);
    callback({success:1})
  }
}); 
}

exports.getCompanyUsers = function(connection,data,callback) { 
   var query = connection.query("SELECT * FROM `users` WHERE `company_id` = ? AND `authorized_login` = 'Y' ",[data.company_id],function(err, rows, fields) {
      if (!err){
           callback({message:'Got The Company Users  Data', success:1, data:rows});  
      }else{
        console.log(err);
        callback({message:"Could not retrive users !!", success:0, error_code:903});
      }

   });
}
