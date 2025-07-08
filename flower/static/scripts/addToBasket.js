function addToBasket(id, name, image, price, quantity){
    let basket;
    if(localStorage.getItem("basket")!=null){
        basket = JSON.parse(localStorage.getItem("basket"));
    }
    else{
        basket = [];
    }
    const sameElement = basket.find(item=>item.id===id)
    if(!sameElement){
        basket.push({id, name, image, price, quantity});
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    if( document.getElementById("popout")){
        document.getElementById("popout").style.display = "flex";
    }
}
function addToLikelist(id, name, image, price){
    let likelist;
    if(localStorage.getItem("likelist")!=null){
        likelist = JSON.parse(localStorage.getItem("likelist"));
    }
    else{
        likelist = [];
    }
    const sameElement = likelist.find(item=>item.id===id)
    if(!sameElement){
        likelist.push({id, name, image, price});
    }
    localStorage.setItem("likelist", JSON.stringify(likelist));
}

