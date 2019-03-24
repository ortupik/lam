$(function(){

   var mode = "mobile";
   var cart_items = [];


   $("#checkout_submit").empty();
   $("#checkout_submit").append(returnPesapalUi());

    getCartItems(function(result){

    	cart_items =result;

	    $("#cart_side_list").empty();

		for(var i = 0; i < result.length; i++){
           displayCartItem(result[i]);
		}

	}); 

	

   $("#payment_mode .mode").on("click",function(){
   	    mode = $(this).attr("mode");
   	    var paymentDesc = $(this).find(".tm-choose-title").text();
   	    $("#payment_dec").text(paymentDesc);
         
        $("#checkout_submit").empty();

   	    if(mode == "paypal"){
   	    	$("#checkout_submit").append('<div ><form method="POST" action="/paypal-checkout">'+
										  '<div class="box" >'+
										  '<button id="checkoutbtn" class="paypal-button uk-button uk-flex-center uk-button-small uk-flex-middle" type="submit">'+
										    '<span class="paypal-button-title">'+
										      'Order, Pay with '+
										    '</span>'+
										    '<span class="paypal-logo">'+
										      '<i>Pay</i><i>Pal</i>'+
										    '</span>'+
										  '</button>'+
										'</div>'+
										'</form></div>');
   	    }else if(mode == "mobile"){
   	    	$("#checkout_submit").append(returnPesapalUi());
   	    }else if(mode == "POD"){

   	    	$("#checkout_submit").append(returnPayOnDeliveryUi());

   	    	$("#payOnDeliverBtn").on("click",function(e){
		        e.preventDefault();
		        var data = {
		        	items: cart_items
		        }
		        $.post("/order/payOnDelivery",data,function(resp){
                   if(resp.success == 1){
                   	
                   	 clearCart(function(resp){
                   	 	 location.href = "/orders";
                   	 });

                   }else{
                   	 alert("An error occured when making order");
                   }
		        });
			});

   	    }
   });

   function returnPesapalUi(){
   	 return '<div style="padding-bottom:20px;"><form method="GET" action="/pesapal-pay">'+
										  '<input type="mobile" name="mobile" value="mobile" hidden="hidden" />'+
										  '<input type="currency" name="currency" value="KES" hidden="hidden" />'+
										  '<input type="text" name="type" value="MERCHANT" hidden="hidden" />'+
										  '<input type="description" name="description" value="Buy an item" hidden="hidden" />'+
										  '<div class="box">'+
										  '<button id="checkoutbtn" class=" uk-button  uk-button-secondary  " type="submit">'+
										      'Order, Pay with Pesapal'+
										  '</button>'+
										'</div>'+
										'</form></div>';
   }

    function returnPayOnDeliveryUi(){
   	 return '<div style="padding-bottom:20px;">'+
										  '<div class="box">'+
										  '<button id="payOnDeliverBtn" class=" uk-button uk-button-secondary ">'+
										      'Order, Pay on delivery'+
										  '</button>'+
										'</div>'+
										'</div>';
   }

  
   
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

    	var total = parseFloat(product.price) * parseInt(product.quantity);

	     var cart_item = '<tr>'+
	                      '<td class="uk-text-small">'+product.name+'</td>'+
	                      '<td class="uk-text-meta">Ksh '+product.price.toLocaleString()+'</td>'+
	                      '<td lzass="uk-text-small">'+product.quantity+'</td>'+
	                      '<td class="uk-text-small">Ksh '+total.toLocaleString()+'</td>'+
	                     '</tr>';				


	   $("#checkout_summary_cart").append(cart_item);


	   bLazy.revalidate(); 

	   
	}

});