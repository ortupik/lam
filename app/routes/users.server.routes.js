'use strict';

/**
 * Module dependencies.
 */
var multer = require('multer');

module.exports = function(app,connection) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');  

	app.post('/auth/signin', function(req, res, next) {
		users.signin(connection,req.body,function(resp){
       //if(resp.success == 1){
       	 req.session.user = resp.user;
      // }
       res.json(resp);
		});
	});

  app.get('/setup_password', function (req, res) {
     var signup_code = req.query.signup_code;
     users.getUserSigned(connection,signup_code,function(resp){
        if(resp.success == 1){
          res.render('setup_password.pug',{first_name:resp.data.first_name});
        }else{
          res.render('setup_password.pug',{errorMessage:"Invalid Sign Up Code"});
        }
    });
     
     
  });

	app.post('/auth/updateSignUpPassword', function(req, res) {

		var data = req.body;

    console.log(data)
  
		users.updateSignUpPassword(connection,data,function(resp){
       console.log(resp)
       res.json(resp); 
		});
	});

  app.post('/auth/validate_code', function(req, res) {  

    var email = req.session.user.email;
    var data = req.body;
    data.email = email;
  
    users.validateAccessCode(connection,data,function(resp){
       if(resp.success == 1){
         req.session.verified_user = true;
         req.session.user = resp.user;
       }
       res.json(resp); 
    });
  });

  app.post('/users/getUsersStats', function(req, res, next) {
     users.getUsersStats(connection,req.body,function(resp){
        res.json(resp);
     });
  });

  app.post('/users/getCompanyUsers', function(req, res, next) {
     var data = req.body;
     users.getCompanyUsers(connection,data,function(resp){
        res.json(resp);
    });
  });
  app.post('/users/create_user', function(req, res, next) {
     if(req.session.user){
       var managerData = req.session.user;
       users.createUser(connection,req.body,managerData,function(resp){
          res.json(resp);
      });
     }else{
        res.json({success:0,message:"Please Login to Proceed"});
     }
     
  });

	var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            var filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            users.updateProfilePic(req.user._id,"uploads/"+filename);
            cb(null, filename);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
            	 console.log(err)
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });


};