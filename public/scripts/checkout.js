$(function(){
   
    $("#checkout_form").on("submit",function (e) {

    	e.preventDefault();

    	var phone = $("#phone").val();
    	var email = $("#email").val();
    	var fname = $("#fname").val();
    	var lname = $("#lname").val();
        var postcode = $("#postcode").val();
        var house = $("#house").val();
        var building = $("#building").val();
        var street = $("#street").val();
        var phone = $("#phone").val();
        var city = $("#city").val();
        var floor = $("#floor").val();
        var county = $("#county").val();
        var comment = $("#comment").val();
        var entrance = $("#entrance").val();


    	var data = {
    		fname:fname,
    		lname:lname,
    		phone:phone,
    		email:email,
            postcode:postcode,
            house:house,
            building:building,
            street:street,
            comment:comment,
            floor:floor,
            city:city,
            county:county,
            entrance:entrance
    	}

    	$.post("/shipping/save",data,function(resp){
           if(resp.success == 1){
              location.href = "/payment";
           }
    	});

    	
    });


});
