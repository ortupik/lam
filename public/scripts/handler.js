$(function(){
    
    var page = 1;
    var displayLimit = 9;
    var pages = 0;

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
    query.to = 9999999;
    query.price_sort = 1;
    query.brand = [];

    var page_title = $("#page_title").text();

   loadItems();

    function loadItems(){

    	 query.page = page;

	    $.get("/products/all",query,function(res){

	        var products = res.data;
	        var total = res.total;
            pages = res.pages;
            
            if(!total){
           	  total = 0;
            }

	    	$(".loader").hide();

	    	if(products != undefined && products.length > 0){
	    		$(".settings-header").removeClass("uk-hidden");
	    	}

	    	if(products != undefined && products.length >= 6 && page < pages){
	            $(".load_div").removeClass("uk-hidden");
	    	}else{
	    		 $(".load_div").addClass("uk-hidden");
	    	}

	        for(x in products){
		    	var product = products[x];
		    	$("#product_div").append(getProductHtml(product));
		    	bLazy.revalidate();
		    	bLazy.revalidate();
		    }

		    var addToCartButtons = document.querySelectorAll('.js-add-to-cart');
			    Array.prototype.forEach.call(addToCartButtons, function(el) {
			        el.onclick = function() {
			        	var product_id = $(this).attr("product_id");
			        	$.post("/product",{id:product_id},function(res){
			        		if(res.success = 1){
			        			 var product = res.product;
			        			 addCartItem(product,function(resp){
			        			 	 displayCartItem(product); 
			        			 	 var currentT = $("#badge_cart").text();
						          	 if(currentT != undefined && currentT != ""){
					                     current = parseInt(currentT) +1;
						          	 }
						          	  $("#badge_cart").text(current);
                                      UIkit.offcanvas('#cart-offcanvas').show();
			        			 });
			        		}
			        	})
			        };
			});

			 var addToButtons = document.querySelectorAll('.js-add-to');
			    Array.prototype.forEach.call(addToButtons, function(el) {
			        var link;
			        var message = '<span class="uk-margin-small-right" uk-icon=\'check\'></span>Added to ';
			        var links = {
			            favorites: '<a href="/favorites">favorites</a>',
			        };
			        if (el.classList.contains('js-add-to-favorites')) {
			            link = links.favorites;
			        };
			      
			        el.onclick = function() {
			            if (!this.classList.contains('js-added-to')) {
			                UIkit.notification({
			                    message: message + link,
			                    pos: 'bottom-right'
			                });
			            }
			            this.classList.toggle('tm-action-button-active');
			            this.classList.toggle('js-added-to');
			        };
			 });

           $(".pagination__list").empty();

           
           if(total == 1){
              $(".page_quantity").text(total+" Product Found" );
           }else{
           	  $(".page_quantity").text(total+" Products Found" );
           } 
           

           if(products.length > 0){

           	  $(".pagination__list").append('<li class="pagination__group"><a href="#" class="pagination__item pagination__control pagination__control_prev">prev</a></li>');

           	  for(var i = 1; i <= pages; i++){
	           	  if(i == page){
	                $(".pagination__list").append('<li class="pagination__group"><span class="pagination__item pagination__item_active">'+i+'</span></li>');
	           	  }else{
	           	  	$(".pagination__list").append('<li class="pagination__group"><a href="#" class="pagination__item">'+i+'</a></li>');
	           	  }
              }

             $(".pagination__list").append('<li class="pagination__group" ><a href="#"  class="pagination__item pagination__control pagination__control_next">next</a></li>');

           }

           

            $(".pagination__list a").on("click",function(){
		       var raw_no = $(this).text();
		       if(raw_no == "next"){
		       	 if(page < pages){
                     page++;
                      $("#product_div").empty();
                      $(".load_div").addClass("uk-hidden");
				      $(".loader").show();
				      loadItems();
                  }
		       }else if(raw_no == "prev"){
                   if(page > 1){
                      page--;
                       $("#product_div").empty();
                       $(".load_div").addClass("uk-hidden");
				       $(".loader").show();
				       loadItems();
                   }
		       }else{
		         var no = parseInt(raw_no);
		         page = no;
		          $("#product_div").empty();
		          $(".load_div").addClass("uk-hidden");
			      $(".loader").show();
			      loadItems();
		       }
		       
		    });


	    });
        
	    $.post("/filter/getBrands",query,function(res){

	       $("#list_brand").empty();

           for(var i = 0; i < res.data.length; i++){
           	    var obj = res.data[i];
           	    var brandName = obj._id.brand;

           	    var classes = "";

           	    if($.inArray( brandName, query.brand ) > -1){
                   classes = 'checked="checked"';
           	    }

           	    $("#list_brand").append('<li><input class="tm-checkbox brand_check_box" '+classes+' id="'+i+'" value="'+brandName+'" type="checkbox" /><label for="'+i+'"><span>  '+brandName+'  <span class="uk-text-meta uk-text-xsmall">'+obj.total+'</span></span></label></li>');

           }

           $(".brand_check_box").on("click",function(){

           	  var brand = $(this).val();
           	  var isChecked = $(this).is(":checked");
           	  page = 1;

           	  if(isChecked){
                 query.brand.push(brand);
           	  }else{
                 query.brand.splice($.inArray(brand, query.brand), 1 );
           	  }

           	   $("#product_div").empty();
               $(".load_div").addClass("uk-hidden");
		       $(".loader").show();

           	   loadItems();

	       })

	    });



	}

	$(".price_sort_link").on("click",function(res){

		var sort_by = $(this).attr("sort_by");

		if(sort_by == "asc"){
           $(".price_sort_icon_asc").addClass("uk-hidden");
           $(".price_sort_icon_desc").removeClass("uk-hidden");
           $(this).attr("sort_by","desc");
           query.price_sort = -1;
		}else{
           $(".price_sort_icon_desc").addClass("uk-hidden");
           $(".price_sort_icon_asc").removeClass("uk-hidden");
           $(this).attr("sort_by","asc");
           query.price_sort = 1;
		}

	    $("#product_div").empty();
        $(".uk-pagination").empty();
        $(".settings-header").addClass("uk-hidden");
        $(".load_div").addClass("uk-hidden");
        $(".loader").show();
        loadItems();

	})
    
    $(".price_filter_button").on("click",function(){

        var to = $(".price_filter_to").val();
        var from = $(".price_filter_from").val();

        if(to){
           query.to = parseInt(to);
        }else{
           query.to = 9999999;
        }

        if(from){
        	query.from = parseInt(from);
        }else{
        	query.from = 0;
        }

        page = 1;
    
        $("#product_div").empty();
        $(".uk-pagination").empty();
        $(".settings-header").addClass("uk-hidden");
        $(".load_div").addClass("uk-hidden");
        $(".loader").show();
        loadItems();

    });

    $(".load_div").on("click",function(){

    	if(page < pages){

    	   $(".loader").show();
	       $(".load_div").addClass("uk-hidden");

	        page = page + 1;
	        loadItems();
	        bLazy.revalidate();
    	}

    });

   $("#reset_btn").on("click",function(){
	  resetParams();
	  query.search = undefined;
	  $("#page_title").text(page_title);
	  loadItems();
   });

   $('#searchField').keypress(function (e) {

	  if (e.which == 13) {
		  	var searchField = $("#searchField").val();
		  	$("#page_title").text('Search Results for "'+ searchField+'"');
		  	$("#searchField").val("");
		  	resetParams();
		  	query.search = searchField;
		  	$("#search_drop_down").slideUp();		  	
	        loadItems();

		    return false;   
	   }

	});

   $("#search_link").on("click",function(){
     $("#search_drop_down").slideDown();	
     $("#searchField").focus();
   });

   function resetParams(){
   	    query.from = 0;
	    query.to = 9999999;
	    query.price_sort = 1;
	    query.brand = [];

	    $(".brand_check_box").removeAttr("checked");
	    $(".price_filter_to").val("");
        $(".price_filter_from").val("");

         $(".price_sort_icon_desc").addClass("uk-hidden");
         $(".price_sort_icon_asc").removeClass("uk-hidden");
         $(".price_sort_link").attr("sort_by","asc");

	    $("#product_div").empty();
        $(".load_div").addClass("uk-hidden");
        $(".loader").show();

   }


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
		                  '<span uk-icon="icon: heart; ratio: 1.15;" class="uk-icon" >'+
		                  '</span>'+
		                  '<span class="tm-product-card-action-text">Add to favorites</span>'+
		               '</a>'+
		            '</div>'+
		            '<button class="uk-button uk-button-primary tm-product-card-add-button tm-shine js-add-to-cart" product_id='+product.id+'>'+
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
   
   	function displayCartItem(product){

		var image_src = product.image.medium;
    	if(image_src == undefined){
    	   image_src = "https://placeholder.pics/svg/450/No%20Image"	
    	}

    	var price = product.price;
    	price = "Ksh "+price.toLocaleString();

    	var cart_item = '<li class="uk-visible-toggle">'+
	    '<div class="uk-grid-small" uk-grid="uk-grid">'+
	        '<div class="uk-width-1-4">'+
	            '<div class="tm-ratio tm-ratio-4-3">'+
	                '<a class="tm-media-box" href="product?id='+product.id+'">'+
	                    '<figure class="tm-media-box-wrap"><img  src="'+image_src+'" alt="'+product.name+'"/></figure>'+
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

	   
	}
	    
	  getCartItems(function(result){

	      $("#cart_side_list").empty();

	      var count = result.length;

	      $("#badge_cart").text(count);

	      for(var i = 0; i < count; i++){
	          displayCartItem(result[i]);
	      }

	      $(".remove_cart_item").on("click",function(e){
	        e.preventDefault();

	        var item_id = parseInt($(this).attr("item_id"));
	        $this = $(this);
	        
	        removeCartItem(item_id,function(res){
	          if(res.success == 1){
	          	 var currentT = $("#badge_cart").text();
	          	 if(currentT != undefined && currentT != ""){
                    var current = parseInt(currentT) -1;
                    $("#badge_cart").text(current);
	          	 }
	             $this.parent().parent().parent().remove();
	          }
	        });

	      });

	    });

});