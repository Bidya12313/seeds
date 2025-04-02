const fav = document.querySelectorAll(".tofav");
fav.forEach((item)=>{
  item.addEventListener('click',()=>{
    addToLikelist('name', 'images/dobryva-cat.jpg', 30);
  })
})
const buy = document.querySelectorAll(".tobuy");
buy.forEach((item)=>{
    item.addEventListener('click',()=>{
      addToBasket('name', 'images/dobryva-cat.jpg', 30, 2);
    })
  })