$(function(){
    
    
	$("#login_form").on("submit",function(e){
		e.preventDefault();

       var email = $("#email_field").val();
       var password = $("#pass_field").val();

       var data = {email:email, password:password};

       $.ajax({
          type: 'POST',
          url: '/auth/signin',
          data: data,
          success: function(response) {
            console.log(response)
		    localStorage.setItem('user', JSON.stringify(response));
			$(".w-form-done").show(); 
			$(".w-form-fail").hide();
			// And redirect to the index page
			location.href = '/settings';
          },
          error: function(response) {
              console.log(response)
			  $(".w-form-fail").show();
          }
      });
       
 
	});

	$("#register_form").on("submit",function(e){
		e.preventDefault();

       var email = $("#email_field").val();
       var name = $("#name_field").val();
       var password = $("#pass_field").val();
       
       var nameArray = name.split(" ");   
       var username = nameArray[0];

       var data = {email:email, password:password, name:name, username:username};

       $.ajax({
          type: 'POST',
          url: '/auth/signup',
          data: data,
          success: function(response) {
            console.log(response)
		    localStorage.setItem('user', JSON.stringify(response));
			$(".w-form-done").show(); 
			$(".w-form-fail").hide();
			// And redirect to the index page
			location.href = '/settings';
          },
          error: function(response) {
              console.log(response)
			  $(".w-form-fail").show();
          }
      });
       
 
	});
});