var db;
var request = window.indexedDB.open("giftstr", 1);
request.onerror = function(event) {
   console.log("error: ");
};

request.onsuccess = function(event) {
  db = request.result;
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("cart", {keyPath: "id", autoIncrement : true});
    db.createObjectStore("address", {keyPath: "id", autoIncrement : true});
}

function getCartItems(callback) {

    var objectStore = db.transaction("cart").objectStore("cart");    

    var items = [];

    objectStore.openCursor().onsuccess = function(event) {
       var cursor = event.target.result;
       if(cursor){
       	 items.push(cursor.value) 
         cursor.continue();
       }else{
       	callback(items);
       }
       
    };

 }
 function clearCart(callback) {
    var request = db.transaction(["cart"], "readwrite")
    .objectStore("cart")
    .clear();
    request.onsuccess = function(event) {
       displayNoti("Order has been made !","success");
       callback({success: 1});
    };
    request.onerror = function(event) {
      callback({success: 0});
    }
 }

function calculateTotal(callback) {
    var total = 0;

    var objectStore = db.transaction("cart").objectStore("cart");    

    var items = [];

    objectStore.openCursor().onsuccess = function(event) {

       var cursor = event.target.result;

       if(cursor){

        var item = cursor.value;
        var price = item.price;
        var quantity = item.quantity;

         total = total + (price * quantity);
         items.push(item) 
         cursor.continue();
       }else{
        callback(total);
       }
       
    };
}
 
 function addCartItem(product,quantity,callback) { 

    var cart_item = {
      id: product.id,
      name: product.name,
      type: product.type,
      image: product.image,
      price: product.price,
      brand: product.brand,
      quantity:quantity
    }

    var request = db.transaction(["cart"], "readwrite")
    .objectStore("cart")
    .add(cart_item);
    request.onsuccess = function(event) {
       displayNoti("Item has been added to Cart","success");
        callback({success: 1});
    };
    
    request.onerror = function(event) {
      //displayNoti("Could Not add item","danger");
      updateCartItem(cart_item.id, quantity, "calculate", function(resp){
        if(resp.success == 1){
           displayNoti("Cart Item updated !","success");
            callback({success: 2});
        }
      });
      callback({success: 0});
    }
 }
 
 function removeCartItem(item_id, callback) {
    var request = db.transaction(["cart"], "readwrite")
    .objectStore("cart")
    .delete(item_id);
    request.onsuccess = function(event) {
      console.log(event)
    	 displayNoti("Item Succefully Removed", "success");
    	 callback({success: 1});
    };
    request.onerror = function(event) {
      displayNoti("Could Not Remove item", "danger");
      callback({success: 0});
    }
 }

 function getCartItem(item_id,callback) {
  
  // Open up a transaction as usual
    var objectStore = db.transaction(['cart'], "readwrite").objectStore('cart');

    // Get the to-do list object that 
    var findRequest = objectStore.get(item_id);

    console.log("id "+item_id)

    findRequest.onsuccess = function() {
      // Grab the data object returned as the result
      var data = findRequest.result;
      console.log(data)
      callback({success: 1, data: data});
    };

 }

function updateCartItem(item_id, quantity, mode, callback){

    // Open up a transaction as usual
    var objectStore = db.transaction(['cart'], "readwrite").objectStore('cart');

    // Get the to-do list object that 
    var findRequest = objectStore.get(item_id);

    findRequest.onsuccess = function() {
      // Grab the data object returned as the result
      var data = findRequest.result;

      var currentQuant = data.quantity;

      console.log(quantity)
  
      if (mode == "passIn"){
        data.quantity = parseInt(quantity);
      }else{
        data.quantity = parseInt(quantity) + currentQuant;
      }
      // Create another request that inserts the item back into the database
      var updateRequest = objectStore.put(data);


      // When this new request succeeds, run the displayData() function again to update the display
      updateRequest.onsuccess = function() {
        callback({success:1});
      };

    };
}
 function displayNoti(message,theme){
    var icon = "check"; 

 	if(theme == "success"){
 	    icon = "check";
 	}else{
 		icon = "close";
    } 

	UIkit.notification({
	    message: "<span uk-icon='icon: "+icon+"'></span> "+message,
	    status: theme,
	    pos: 'top-center',
	    timeout: 2500
   });

}

 function saveShippingAddress(address,callback) {

    removeAddreses(function(res){
      var request = db.transaction(["address"], "readwrite")
      .objectStore("address")
      .add(address);
      request.onsuccess = function(event) {
         displayNoti("Selected Shipping Address","success");
         callback({success: 1});
      };
      
      request.onerror = function(event) {
        displayNoti("Could Not add address","danger");
        callback({success: 0});
      }
      });

 }

 function getShippingAddress(callback) {
    var objectStore = db.transaction("address").objectStore("address");    
    var addresses = [];
    objectStore.openCursor().onsuccess = function(event) {
       var cursor = event.target.result;
       if(cursor){
         addresses.push(cursor.value);
         callback(addresses); 
       }else{
        console.log(addresses)
        callback(addresses);
       }
       
    };

 }

 function removeAddreses(callback) {
    var request = db.transaction(["address"], "readwrite")
    .objectStore("address")
    .clear();
    request.onsuccess = function(event) {
       callback({success: 1});
    };
    request.onerror = function(event) {
      callback({success: 0});
    }
 }