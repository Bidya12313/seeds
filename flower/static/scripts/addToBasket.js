function addToBasket(name, image, price, quantity){
    let basket;
    if(localStorage.getItem("basket")!=null){
        basket = JSON.parse(localStorage.getItem("basket"));
    }
    else{
        basket = [];
    }
    basket.push({name, image, price, quantity});
    localStorage.setItem("basket", JSON.stringify(basket));
    if( document.getElementById("popout")){
        document.getElementById("popout").style.display = "flex";
    }
}
function addToLikelist(name, image, price){
    let likelist;
    if(localStorage.getItem("likelist")!=null){
        likelist = JSON.parse(localStorage.getItem("likelist"));
    }
    else{
        likelist = [];
    }
    likelist.push({name, image, price});
    localStorage.setItem("likelist", JSON.stringify(likelist));
}

