$(function(){


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

    	var cart_item = '<div class="uk-card-body">'+
						'  <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-flex-middle" uk-grid="uk-grid"> '+
						'    <!-- Product cell-->'+
						'    <div>'+
						'      <div class="uk-grid-small" uk-grid="uk-grid">'+
						'        <div class="uk-width-1-3">'+
						'          <div class="tm-ratio tm-ratio-4-3"><a class="tm-media-box" href="'+product.href+'">'+
						'              <figure class="tm-media-box-wrap"><img src="'+product.image.small+'" alt="'+product.name+'"/></figure></a></div>'+
						'        </div>'+
						'        <div class="uk-width-expand">'+
						'          <div class="uk-text-meta">'+product.type+'</div><a class="uk-link-heading" href="'+product.href+'">'+product.name+'</a>'+
						'        </div>'+
						'        <div class="uk-width-auto remove_cart_item" item_id='+product.id+'><a class="uk-text-danger" uk-tooltip="Remove"><span uk-icon="close"></span></a></div>'+

						'      </div>'+
						'    </div>'+
						'    <!-- Other cells-->'+
						'    <div>'+
						'      <div class="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-expand@s uk-text-center">'+
						'        <div class="uk-width-1-3">'+
						'          <div>'+price+'</div>'+
						'        </div>'+
						'        <div class="tm-cart-quantity-column uk-width-1-3">'+
									'<div><a onclick="increment(-1, 1)" uk-icon="icon: minus; ratio: .75"></a>'+
									'  <input class="uk-input tm-quantity-input" id="product-" type="text" maxlength="3" value="1"/>'+
									'  <a onclick="increment(+1, 1)" uk-icon="icon: plus; ratio: .75"></a>'+
									'</div>'+
						'        </div>'+
						'        <div class="uk-width-1-3">'+
						'          <div>'+price+'</div>'+
						'        </div>'+
						'      </div>'+
						'    </div>'+
						'  </div>'+
						'</div>';

	   $("#cart_body").append(cart_item);


	   bLazy.revalidate();

	   
	}
	



});
