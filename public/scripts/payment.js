$(function(){

   var mode = "mobile";


   $("#checkout_submit").empty();
   $("#checkout_submit").append(returnPesapalUi());

   $("#payment_mode .mode").on("click",function(){
   	    mode = $(this).attr("mode");
   	    var paymentDesc = $(this).find(".tm-choose-title").text();
   	    $("#payment_dec").text(paymentDesc);
         
        $("#checkout_submit").empty();

   	    if(mode == "paypal"){
   	    	$("#checkout_submit").append('<form method="POST" action="/paypal-checkout">'+
										  '<div class="box">'+
										  '<button id="checkoutbtn" class="paypal-button uk-button uk-flex-center uk-flex-middle" type="submit">'+
										    '<span class="paypal-button-title">'+
										      'Pay with '+
										    '</span>'+
										    '<span class="paypal-logo">'+
										      '<i>Pay</i><i>Pal</i>'+
										    '</span>'+
										  '</button>'+
										'</div>'+
										'</form>');
   	    }else if(mode == "mobile"){
   	    	$("#checkout_submit").append(returnPesapalUi());
   	    }
   });

   function returnPesapalUi(){
   	 return '<form method="GET" action="/pesapal-pay">'+
										  '<input type="mobile" name="mobile" value="mobile" hidden="hidden" />'+
										  '<input type="currency" name="currency" value="KES" hidden="hidden" />'+
										  '<input type="text" name="type" value="MERCHANT" hidden="hidden" />'+
										  '<input type="description" name="description" value="Buy an item" hidden="hidden" />'+
										  '<div class="box">'+
										  '<button id="checkoutbtn" class=" uk-button  uk-button-secondary " type="submit">'+
										      'Pay with Pesapal'+
										  '</button>'+
										'</div>'+
										'</form>';
   }

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

});