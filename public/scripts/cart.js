$(function(){

	getCartItems(function(result){

		$("#cart_side_list").empty();
		for(var i = 0; i < result.length; i++){
           displayCartItem(result[i]);
		}

		$(".remove_cart_item").on("click",function(e){
			e.preventDefault();

			var item_id = parseInt($(this).attr("item_id"));
			$this = $(this);
			
			removeCartItem(item_id,function(res){
				if(res.success == 1){
                   $this.parent().parent().parent().remove();
				}
			});
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

    	var cart_item = '<li class="uk-visible-toggle">'+
	    '<div class="uk-grid-small" uk-grid="uk-grid">'+
	        '<div class="uk-width-1-4">'+
	            '<div class="tm-ratio tm-ratio-4-3">'+
	                '<a class="tm-media-box" href="product?id='+product.id+'">'+
	                    '<figure class="tm-media-box-wrap"><img class="b-lazy" src="images/ajax-loader.gif" data-src="'+image_src+'" alt="'+product.name+'"/></figure>'+
	                '</a>'+
	            '</div>'+
	        '</div>'+
	        '<div class="uk-width-expand">'+
	            '<div class="uk-text-meta uk-text-xsmall">'+product.brand.name+'</div><a class="uk-link-heading uk-text-small" href="product.href">'+product.name+'</a>'+
	            '<div class="uk-margin-xsmall uk-grid-small uk-flex-middle" uk-grid="uk-grid">'+
	                '<div class="uk-text-bolder uk-text-small">'+price+'</div>'+
	                '<div class="uk-text-meta uk-text-xsmall">1 × '+price+'</div>'+
	            '</div>'+
	        '</div>'+
	        '<div><a class="uk-icon-link uk-text-danger uk-invisible-hover remove_cart_item" href="#" uk-icon="icon: close; ratio: .75" uk-tooltip="Remove" item_id='+product.id+'></a></div>'+
	    '</div>'+
	   '</li>';	

	   $("#cart_side_list").append(cart_item);

	   bLazy.revalidate();

	   
	}
	



});
