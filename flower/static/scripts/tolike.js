const fav = document.querySelectorAll(".tofav");
fav.forEach((item)=>{
  item.addEventListener('click',()=>{
    const id = item.dataset.id;
    const name = item.dataset.name;
    const image = item.dataset.image;
    const price = parseFloat(item.dataset.price);
    addToLikelist(id, name, image, price);
    updateLikeList();
  })
})