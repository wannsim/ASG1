let cart = document.querySelector(".cart");
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
}
else{
    ready();
}

//remove
function ready(){
    var removebtn = document.getElementsByClassName("remove");
    console.log(removebtn)
    for (var i = 0; i < removebtn.length; i++){
        var button = removebtn[i]
        button.addEventListener("click", removeItem);

    }
    var quantity = document.getElementsByClassName("cartQuantity");
    for (var i = 0; i < quantity.length; i++){
        var input = quantity[i]
        input.addEventListener("change", quantityChange)
    }
    //add
    var adding = document.getElementsByClassName("addbtn")
    for (var i = 0; i < adding.length; i++){
        var btn = adding[i];
        btn.addEventListener("click", addToCart)
    }
    //buy
    document.getElementsByClassName("buy")[0].addEventListener("click", buyButton);

}

//buy
function buyButton(){
    alert("Order has been placed");
    var cartContent = document.getElementsByClassName("cartContent")[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}



function quantityChange(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

//add
function addToCart(event){
    var btn = event.target;
    var products = btn.parentElement;
    var title = products.getElementsByClassName("productTitle")[0].innerText;
    var price = products.getElementsByClassName("price")[0].innerText;
    var img = products.getElementsByClassName("merchImg")[0].src;
    addMerchToCart(title, price, img);
    updateTotal();
}
function addMerchToCart(title, price, img){
    var merchbox = document.createElement("div");
    merchbox.classList.add("cartbox")
    var items = document.getElementsByClassName("cartContent")[0];
    var itemNames = items.getElementsByClassName("productTitle-cart");
    for (var i = 0; i < itemNames.length; i++){
        if (itemNames[i].innerText == title){
            alert("Item has already been added to your cart");
            return; 
        }
    }
    var cartCont = `
                <img  alt = "" class = "cartImg" src = "${img}" >
                <div class = "detailBox">
                    <div class = "productTitle-cart">${title}</div>
                    <div class = "price-cart">${price}</div>
                    <input type ="number" value = "1" class = cartQuantity>
                </div>
            </div>
            <button class = "remove" type="button" >Remove</button>`
merchbox.innerHTML = cartCont;
items.append(merchbox);
merchbox.getElementsByClassName("remove")[0].addEventListener("click", removeItem);
merchbox.getElementsByClassName("cartQuantity")[0].addEventListener("change", quantityChange);
}


function removeItem(event){
    var buttoncliked = event.target;
    buttoncliked.parentElement.remove();
    updateTotal();
}



// total
function updateTotal(){
    var cartcontent = document.getElementsByClassName("cartContent")[0];
    var cartboxes = cartcontent.getElementsByClassName("cartbox");
    var total = 0;
    for (var i = 0; i < cartboxes.length; i++){
        var box = cartboxes[i];
        var priceEle = box.getElementsByClassName("price-cart")[0];
        var quantityEle = box.getElementsByClassName("cartQuantity")[0];
        var price = parseFloat(priceEle.innerText);
        var quantity = quantityEle.value
    }    
    total = total + (price * quantity);
    total = Math.round(total * 100/ 100);
    document.getElementsByClassName("cartTotal")[0].innerText =( "$" + total);
    
}