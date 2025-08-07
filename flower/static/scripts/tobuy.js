const buy = document.querySelectorAll(".tobuy");
let rawBasket = localStorage.getItem("basket");
if (!rawBasket) {
  localStorage.setItem("basket", JSON.stringify([]));
  rawBasket = "[]";
}
let likeItemsToBuy = JSON.parse(rawBasket);
buy.forEach((item) => {
  likeItemsToBuy = JSON.parse(localStorage.getItem("basket"));
  const id = item.dataset.id;
  if (likeItemsToBuy.some((item) => item.id === id)) {
    item.classList.add("buy-exist");
  }
  item.addEventListener("click", () => {
    rawBasket = localStorage.getItem("basket");
    if (!rawBasket) {
      localStorage.setItem("basket", JSON.stringify([]));
      rawBasket = "[]";
    }
    likeItemsToBuy = JSON.parse(rawBasket);
    if (!likeItemsToBuy.some((item) => item.id === id)) {
      const name = item.dataset.name;
      const image = item.dataset.image;
      const price = parseFloat(item.dataset.price);
      const quantity = parseInt(item.dataset.quantity);
      addToBasket(id, name, image, price, quantity);
      item.classList.add("buy-exist");
    } else {
      window.location.href = "/basket";
    }
  });
});
