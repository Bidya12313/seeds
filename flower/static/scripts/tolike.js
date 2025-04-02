const fav = document.querySelectorAll(".tofav");
fav.forEach((item)=>{
  item.addEventListener('click',()=>{
    addToLikelist('name', 'images/dobryva-cat.jpg', 30);
  })
})