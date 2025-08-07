const titles = document.querySelectorAll(".bar-name");
titles.forEach((item) => {
  item.addEventListener("click", () => {
    const ul = document.querySelector(`.${item.id}`);
    ul.style.display = ul.style.display === "block" ? "none" : "block";
    const arr = item.querySelector('.arr');
    arr.textContent  = arr.textContent ==="▼"?"▲":"▼"
  });
});
const categoriesSize = document.querySelectorAll(".prod-card-cat");

categoriesSize.forEach((item)=>{
  if(item.textContent.length > 20){
    item.style.fontSize = "12px"
  }
})
const favCard = document.querySelectorAll(".tofav");
let likeItemsProducts = JSON.parse(localStorage.getItem("likelist"));
function setFavCard() {
  favCard.forEach((item) => {
    likeItemsProducts = JSON.parse(localStorage.getItem("likelist"));
    if (likeItemsProducts.some((element) => element.id === item.dataset.id)) {
      item.classList.add("fav-exist");
    } else if (item.classList.contains("fav-exist")) {
      item.classList.remove("fav-exist");
    }
  });
}
setFavCard();
const buyCard = document.querySelectorAll(".tobuy");
let basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
function addingToBuy(item) {
  addToBasket(
    item.dataset.id,
    item.dataset.name,
    item.dataset.image,
    parseFloat(item.dataset.price),
    parseInt(item.dataset.quantity)
  );
}
function toggleToBuy(item) {
  basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
  if (!basketItemsToBuy.some((element) => element.id === item.dataset.id)) {
    addingToBuy(item);
    item.classList.add("fav-exist");
    window.dispatchEvent(new CustomEvent("addedToBasket"));
  } else if (item.classList.contains("fav-exist")) {
    window.location.href = "/basket";
  }
  
}
buyCard.forEach((item) => {
  item.addEventListener("click", () => {
    toggleToBuy(item);
  });
});
function setBuyCard() {
  buyCard.forEach((item) => {
    const id = item.dataset.id;
    basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
    if (basketItemsToBuy.some((item) => item.id === id)) {
      item.classList.add("fav-exist");
    } else if (item.classList.contains("fav-exist")) {
      item.classList.remove("fav-exist");
    }
  });
}
setBuyCard();
let params = new URLSearchParams(document.location.search);
let category = params.get("category");
cat_arr.forEach((item) => {
  if (item.name === category) {
    document.getElementById("category-list").innerHTML += `
                            <a href="/products?category=${item.slug}"><li id="${item.name}" class="categories chosen">
                            ${item.name} →
                        </li></a>`;
  } else {
    document.getElementById("category-list").innerHTML += `
                            <a href="/products?category=${item.slug}"><li id="${item.name}" class="categories">
                            ${item.name} →
                        </li></a>`;
  }
});
window.addEventListener("storage", () => {
  setFavCard();
  setBuyCard();
});

window.addEventListener('addedToBasket', () => {
  setBuyCard();
  updatePopout();
});
window.addEventListener("deleteRowInPopout", () => {
  setBuyCard();
  updatePopout();
});