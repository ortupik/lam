$(function(){

    $.get("/products/all",function(res){

        var products = res.data;

        for(x in products){
	    	var product = products[x];
	    	$(".loader").hide();
	    	$(".settings-header").removeClass("uk-hidden");
	    	$(".load_div").removeClass("uk-hidden");
	    	$(".pagination_div").removeClass("uk-hidden");
	    	$("#product_div").append(getProductHtml(product));
	    }

    });


    function getProductHtml(product){

        var image_src = product.image.medium;
    	if(image_src == undefined){
    	   image_src = "https://placeholder.pics/svg/450/No%20Image"	
    	}

    	var product_html = '<article class="tm-product-card uk-first-column">'+
		   '<div class="tm-product-card-media">'+
		      '<div class="tm-ratio tm-ratio-4-3">'+
		         '<a class="tm-media-box" href="product?id='+product.id+'">'+
		            '<div class="tm-product-card-labels"><span class="uk-label uk-label-success">new</span></div>'+
		            '<figure class="tm-media-box-wrap"><img class="b-lazy" src="images/ajax-loader.gif" data-src="'+image_src+'" alt="'+product.name+'"></figure>'+
		         '</a>'+
		      '</div>'+
		   '</div>'+
		   '<div class="tm-product-card-body">'+
		      '<div class="tm-product-card-info">'+
		         '<div class="uk-text-meta uk-margin-xsmall-bottom">Laptop</div>'+
		         '<h3 class="tm-product-card-title"><a class="uk-link-heading" href="product?id='+product.id+'">'+product.name+'</a></h3>'+
		         '<ul class="uk-list uk-text-small tm-product-card-properties">'+
		            '<li><span class="uk-text-muted">Diagonal display: </span><span>15.4"</span></li>'+
		            '<li><span class="uk-text-muted">CPU: </span><span>Intel®&nbsp;Core™ i7</span></li>'+
		            '<li><span class="uk-text-muted">RAM: </span><span>16&nbsp;GB</span></li>'+
		            '<li><span class="uk-text-muted">Video Card: </span><span>AMD Radeon Pro 555</span></li>'+
		         '</ul>'+
		      '</div>'+
		      '<div class="tm-product-card-shop">'+
		         '<div class="tm-product-card-prices">'+
		            '<del class="uk-text-meta">'+product.oldPrice+'</del>'+
		            '<div class="tm-product-card-price">'+product.price+'</div>'+
		         '</div>'+
		         '<div class="tm-product-card-add">'+
		            '<div class="uk-text-meta tm-product-card-actions">'+
		               '<a class="tm-product-card-action js-add-to js-add-to-favorites tm-action-button-active js-added-to" title="Add to favorites">'+
		                  '<span uk-icon="icon: heart; ratio: .75;" class="uk-icon">'+
		                  '</span>'+
		                  '<span class="tm-product-card-action-text">Add to favorites</span>'+
		               '</a>'+
		               '<a class="tm-product-card-action js-add-to js-add-to-compare tm-action-button-active js-added-to" title="Add to compare">'+
		                  '<span uk-icon="icon: copy; ratio: .75;" class="uk-icon">'+
		                  '</span>'+
		                  '<span class="tm-product-card-action-text">Add to compare</span>'+
		               '</a>'+
		            '</div>'+
		            '<button class="uk-button uk-button-primary tm-product-card-add-button tm-shine js-add-to-cart">'+
		               '<span class="tm-product-card-add-button-icon uk-icon" uk-icon="cart">'+
		               '</span>'+
		               '<span class="tm-product-card-add-button-text">add to cart</span>'+
		            '</button>'+
		         '</div>'+
		      '</div>'+
		   '</div>'+
		'</article>';

		  bLazy.revalidate();

		return product_html;
    }  



});