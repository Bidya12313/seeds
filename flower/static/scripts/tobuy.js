const buy = document.querySelectorAll(".tobuy");
buy.forEach((item)=>{
    item.addEventListener('click',()=>{
      const id = item.dataset.id;
      const name = item.dataset.name;
      const image = item.dataset.image;
      const price = parseFloat(item.dataset.price);
      addToBasket(id, name, image, price);
      updateBasket();
    })
  })