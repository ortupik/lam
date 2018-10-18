$(function(){

  if(localStorage.getItem("user") == undefined){
  
	    $.get('/users/me',function(resp) {
	    	console.log(resp)
	    	if(resp == null){
	    		location.href="/login";
	    	}else{
			    if(resp.provider == "facebook"){
			    	var response = {};
					response.name = resp.displayName;
					response.email = resp.providerData.email;
					response.bio = resp.providerData.description;
					response.profile_image_url = resp.providerData.picture.data.url;
					localStorage.setItem('user', JSON.stringify(response));
					loadUserProfile();
				 }else{
				 	localStorage.setItem('user', JSON.stringify(resp));
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