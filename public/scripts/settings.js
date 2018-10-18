$(function(){

// Test for the ugliness.
if (window.location.hash == '#_=_'){

    // Check if the browser supports history.replaceState.
    if (history.replaceState) {

        // Keep the exact URL up to the hash.
        var cleanHref = window.location.href.split('#')[0];

        // Replace the URL in the address bar without messing with the back button.
        history.replaceState(null, null, cleanHref);

    } else {

        // Well, you're on an old browser, we can get rid of the _=_ but not the #.
        window.location.hash = '';

    }

}

  if(localStorage.getItem("user") == undefined){
  
	    $.get('/users/me',function(resp) {
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