const buy = document.querySelectorAll(".tobuy");
buy.forEach((item)=>{
    item.addEventListener('click',()=>{
      addToBasket('name', 'images/dobryva-cat.jpg', 30, 2);
    })
  })