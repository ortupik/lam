$(function(){
    
    var start = 0;
    var displayLimit = 9;


	function getQueryParams(qs) {
	    qs = qs.split('+').join(' ');

	    var params = {},
	        tokens,
	        re = /[?&]?([^=]+)=([^&]*)/g;

	    while (tokens = re.exec(qs)) {
	        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	    }

	    return params;
	}

    var query = getQueryParams(document.location.search);
    query.from = 0;
    query.to = 1000000;


    loadItems();

    function loadItems(){

    	 query.start = start;

	    $.get("/products/all",query,function(res){

	        var products = res.data;

	    	$(".loader").hide();

	    	if(products != undefined && products.length > 1){
	    		$(".settings-header").removeClass("uk-hidden");
	    	}

	    	if(products != undefined && products.length >= 6){
	           $(".load_div").removeClass("uk-hidden");
	    	}

	        for(x in products){
		    	var product = products[x];
		    	$("#product_div").append(getProductHtml(product));
		    	bLazy.revalidate();
		    	bLazy.revalidate();
		    }

           $(".uk-pagination").empty();

           var count = 1;

           for(var i = 0; i < resultsQu; i+=displayLimit){

           	  if(i == start){
                $(".uk-pagination").append('<li class="uk-active"><a href="#"><span >'+count+'</span></a></li>');
           	  }else{
           	  	$(".uk-pagination").append('<li><a href="#"><span >'+count+'</span></a></li>');
           	  }
              count++;

           }

            $(".uk-pagination li").on("click",function(){
		       var raw_no = $(this).find("span").text();
		       var no = parseInt(raw_no) -1;
		       start = no * displayLimit;
		       $("#product_div").empty();
		       $(".loader").show();
		       loadItems();
		    });

	    });

	}
    
    $(".price_filter_button").on("click",function(){

        var to = $(".price_filter_to").val();
        var from = $(".price_filter_from").val();

        if(to){
           query.to = parseInt(to);
        }else{
           query.to = 1000000;
        }

        if(from){
        	query.from = parseInt(from);
        }else{
        	query.from = 0;
        }
    
        $("#product_div").empty();
        $(".loader").show();
        loadItems();

    });

    $(".load_div").on("click",function(){

       $(".loader").show();
       $(".load_div").addClass("uk-hidden");

        start = start + displayLimit;
        loadItems();
        bLazy.revalidate();

    });


    function getProductHtml(product){

        var image_src = product.image.medium;
    	if(image_src == undefined){
    	   image_src = "https://placeholder.pics/svg/450/No%20Image"	
    	}

    	bLazy.revalidate();

    	var oldPrice = product.oldPrice;

    	if(oldPrice == -1){
    		oldPrice = '';
    	}else{
    		oldPrice = "Ksh "+oldPrice.toLocaleString();
    	}

    	var price = product.price;
    	price = "Ksh "+price.toLocaleString();

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
		         '<div class="uk-text-meta uk-margin-xsmall-bottom">'+product.brand.name+'</div>'+
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
		            '<del class="uk-text-meta">'+oldPrice+'</del>'+
		            '<div class="tm-product-card-price">'+price+'</div>'+
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