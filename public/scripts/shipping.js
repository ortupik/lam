
$(function(){
   
   var clickedNextBtn  = false;

   if(addresses.length < 1){
     $("#next-btn").hide();
   }

   $("#next-btn").on("click",function(e){

       clickedNextBtn = true;

     });



   $(".mode").on("click",function(e){

      var mode = $(this).attr("mode");
      $this = $(this);

      if(mode == "add"){
        $('#save_shipping_form').find("input, textarea").val("");
        $("#save-shipping").text("Save Address");
        $("#next-btn").hide();
      }else{
        $("#next-btn").show();
        for(x in addresses){
            if(x == mode){
                var address = addresses[x];
                $("#phone").val(address.phone);
                $("#email").val(address.email);
                $("#fname").val(address.fname);
                $("#lname").val(address.lname);
                $("#postcode").val(address.postcode);
                $("#house").val(address.house);
                $("#building").val(address.buidling);
                $("#street").val(address.street);
                $("#address").val(address.address);
                $("#floor").val(address.floor);
                $("#county").val(address.county);
                $("#comment").val(address.comment);
                $("#entrance").val(address.entrance);
                
                $("#save-shipping").text("Update Address");

                break;
             }
        }
         
      }
   });

    $("#save_shipping_form").on("submit",function (e) {

    	e.preventDefault();

    	var phone = $("#phone").val();
    	var email = $("#email").val();
    	var fname = $("#fname").val();
    	var lname = $("#lname").val();
        var postcode = $("#postcode").val();
        var house = $("#house").val();
        var building = $("#building").val();
        var street = $("#street").val();
        var address = $("#address").val();
        var floor = $("#floor").val();
        var county = $("#county").val();
        var comment = $("#comment").val();
        var entrance = $("#entrance").val();

        var action = $("#save-shipping").text();
        
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
            address:address,
            county:county,
            entrance:entrance
    	}

        if(action == "Save Address"){
            $.post("/shipping/save",data,function(resp){
               if(resp.success == 1){
                 location.reload();
               }
            });
        }else if(action == "Update Address"){

            if(!clickedNextBtn){
                data._id = $this.attr("shipping_id");
                $.post("/shipping/update",data,function(resp){
                   if(resp.success == 1){
                     location.reload();
                   }
                });
            }else{
                saveShippingAddress(data, function(resp){
                  if(resp.success == 1){
                    location.href = "/checkout";
                  }else{
                    alert("Could not save address !")
                  }
                });
               //
            }
        }

       
    	
    });

    $("#0").trigger( "click" );

});
