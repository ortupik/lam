$(function(){

   var mode = "mobile";

   $("#payment_mode .mode").on("click",function(){
   	    mode = $(this).attr("mode");
   	    var paymentDesc = $(this).find(".tm-choose-title").text();
   	    $("#payment_dec").text(paymentDesc)
   });

   getCartItems(function(result){

	    $("#cart_side_list").empty();

		for(var i = 0; i < result.length; i++){
           displayCartItem(result[i]);
		}

	}); 

   
	$(".remove_cart_item").on("click",function(e){
		e.preventDefault();

		var item_id = parseInt($(this).attr("item_id"));
		$this = $(this);
		
		removeCartItem(item_id,function(res){
			if(res.success == 1){
				var cart_subtotal = 0;
				$("#cart_off_subtotal").text("Ksh "+cart_subtotal.toLocaleString());
				$("#cart_subtotal").text("Ksh "+cart_subtotal.toLocaleString());
				$("#cart_total").text("Ksh "+cart_subtotal.toLocaleString());
               $this.parent().parent().parent().remove();
			}
		});
    });

	function displayCartItem(product){

		var image_src = product.image.medium;
    	if(image_src == undefined){
    	   image_src = "https://placeholder.pics/svg/450/No%20Image"	
    	}

    	var price = product.price;
    	price = "Ksh "+price.toLocaleString();

    	bLazy.revalidate();

    	var cart_item = '<div class="uk-grid-small" uk-grid="uk-grid">'+
						'  <div class="uk-width-expand">'+
						'    <div class="uk-text-small">'+product.name+'</div>'+
						'    <div class="uk-text-meta">1 × '+price+'</div>'+
						'  </div>'+
						'  <div class="uk-text-right">'+
						'    <div>'+price+'</div>'+
						'  </div>'+
						'</div>';

	   $("#checkout_summary_cart").append(cart_item);


	   bLazy.revalidate(); 

	   
	}

	$("#checkoutbtn").on("click",function(e){
         var data = {
         	mobile:mode,
         	currency:"KES",
         	type:"MERCHANT",
         	description:"Yes I made it"
         } 
         $.post("/checkout",data,function(resp){
            $('body').replaceWith(resp);
         });
	});
});