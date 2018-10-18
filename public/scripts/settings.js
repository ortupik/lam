$(function(){

  if(localStorage.getItem("user") == undefined){
  
	    $.get('/users/me',function(response) {
	    	if(response == null){
	    		location.href="/login";
	    	}else{
			    if(response.provider == "facebook"){
			    	var response = {};
					response.name = response.displayName;
					response.email = response.providerData.email;
					response.bio = response.providerData.description;
					response.profile_image_url = response.providerData.picture.data.url;
					localStorage.setItem('user', JSON.stringify(response));
					loadUserProfile();
				 }else{
				 	localStorage.setItem('user', JSON.stringify(response));
				 	loadUserProfile();
				 }
			}
	    });
	}else{
		loadUserProfile();
	}


	function loadUserProfile(){

		var User = JSON.parse(localStorage.getItem("user"));
		console.log(User);

		if(User){

		  if(User.name){
		   $("#name").text(User.name);
		  }
		  if(User.email){
		  	$("#email_field").val(User.email);
		  }

		  if(User.profile_image_url){
		  	 $("#profile_img").attr("src",User.profile_image_url);
		  }

		}
	}
	
})