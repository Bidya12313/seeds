const fav = document.querySelectorAll(".tofav");
fav.forEach((item)=>{
  item.addEventListener('click',()=>{
    const name = item.dataset.name;
    const image = item.dataset.image;
    const price = parseFloat(item.dataset.price);
    addToLikelist(name, image, price);
    updateLikeList();
  })
})