const buy = document.querySelectorAll(".tobuy");
let likeItemsToBuy = JSON.parse(localStorage.getItem("basket"));
buy.forEach((item) => {
  likeItemsToBuy = JSON.parse(localStorage.getItem("basket"));
  const id = item.dataset.id;
  if (likeItemsToBuy.some((item) => item.id === id)) {
    item.classList.add("buy-exist");
  }
  item.addEventListener("click", () => {
    if (!likeItemsToBuy.some((item) => item.id === id)) {
      const name = item.dataset.name;
      const image = item.dataset.image;
      const price = parseFloat(item.dataset.price);
      addToBasket(id, name, image, price);
      item.classList.add("buy-exist");
    }
    else{
      window.location.href = "/basket";
    }
  });
});
