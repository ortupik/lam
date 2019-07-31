$(function(){

  var user = JSON.parse(localStorage.getItem("user"));
  if(user != undefined){
    var fname = user.fname;
    $(".user-name").text(fname);
  }

  $("#loginForm").on("submit", function(e){

  	e.preventDefault();

     $("#errorMessage").hide(); 

     var email = $("#email").val();
     var password = $("#password").val();

     var data  = {
     	email: email,
     	password: password
     }

     $.post("/auth/signin", data, function(resp){
        if(resp.success == 1){
           $("#successMessage").show();
           $("#successMessage").text(resp.message);
           var user = resp.user;
           localStorage.setItem('user', JSON.stringify(user));
           location.href = "/request_access";
        }else{
            $("#errorMessage").show();
            $("#errorMessage").text(resp.message);
        }
     });

  });

  $("#validateAccessCode").on("submit", function(e){
     e.preventDefault();

      $("#errorMessage").hide(); 

     var access_code = $("#access_code").val();
     var user = JSON.parse(localStorage.getItem("user"));

     var data = {
        access_code: access_code
     }

     $.post("/auth/validate_code",data, function(resp){
        if(resp.success == 1){
        	location.href = "/";
        }else{
        	$("#errorMessage").show();
            $("#errorMessage").text(resp.message);
        }
     });

  });

   $("#setupPassword").on("submit", function(e){
     e.preventDefault();

     var url_string = window.location;
     var url = new URL(url_string);
     var signup_code = url.searchParams.get("signup_code");
     
     $("#errorMessage").hide();

     var password = $("#password").val();
     var conf_password = $("#conf_password").val();

     if(password != conf_password){
         $("#errorMessage").show();
         $("#errorMessage").text("Passwords Don't match !");
     }else if(signup_code == undefined || signup_code == null){
        $("#errorMessage").show();
        $("#errorMessage").text("Invalid Sign Up Code");
     }else{
       
       $("#errorMessage").hide(); 

       var user = JSON.parse(localStorage.getItem("user"));

       var data = {
          signup_code: signup_code,
          password: password
       }

       $.post("/auth/updateSignUpPassword",data, function(resp){
          if(resp.success == 1){
            location.href = "/login";
          }else{
            $("#errorMessage").show();
            $("#errorMessage").text(resp.message);
          }
       });

     }

  });
	
});