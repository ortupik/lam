var db;
var request = window.indexedDB.open("hapsdb", 1);
request.onerror = function(event) {
   console.log("error: ");
};

request.onsuccess = function(event) {
db = request.result;
   console.log("success: "+ db);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("cart", {keyPath: "id", autoIncrement : true});
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
 
 function addCartItem(cart_item,callback) {
    var request = db.transaction(["cart"], "readwrite")
    .objectStore("cart")
    .add(cart_item);
    request.onsuccess = function(event) {
       displayNoti("Item has been added to Cart","success");
        callback({success: 1});
    };
    
    request.onerror = function(event) {
      displayNoti("Could Not add item","danger");
      callback({success: 0});
    }
 }
 
 function removeCartItem(item_id, callback) {
    var request = db.transaction(["cart"], "readwrite")
    .objectStore("cart")
    .delete(item_id);
    request.onsuccess = function(event) {
    	 displayNoti("Item Succefully Removed", "success");
    	 callback({success: 1});
    };
    request.onerror = function(event) {
      displayNoti("Could Not Remove item", "danger");
      callback({success: 0});
    }
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
