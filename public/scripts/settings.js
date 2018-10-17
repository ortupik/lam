$(function(){

	var User = JSON.parse(localStorage.getItem("user"));

	if(User){

	  if(User.name){
	   $("#name").text(User.name);
	  }
	  if(User.email){
	  	$("#email_field").val(User.email);
	  }

	  if(User.profile_image_url){
	  	
	  }
	}
	
	
})