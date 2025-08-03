const container = document.getElementById("basket");
let basketItems = JSON.parse(localStorage.getItem("basket")) | [];
const price = document.getElementById("price");
let totalprice = 0;

function updateBasket() {
  basketItems = JSON.parse(localStorage.getItem("basket"));
  const isValid =
    basketItems.length > 0
    //  &&
    // basketItems.some((product) => product.price !== null);
  if (!isValid) {
    document.getElementById("no-items").style.display = "block";
    document.getElementById("continue-btn").style.display = "none";
    document.getElementById("buy-btn").style.display = "none";
    document.getElementById("sum-text").style.display = "none";
    container.innerHTML = "";
  } else {
    document.getElementById("no-items").style.display = "none";
    document.getElementById("continue-btn").style.display = "block";
    document.getElementById("buy-btn").style.display = "block";
    document.getElementById("sum-text").style.display = "flex";
    container.innerHTML = `<tr>
    <th>
    <img src="../static/images/material-symbols_delete-outline.svg" width="30px"/>
    </th>
    <th>
    Фото
    </th>
    <th>
    Назва
    </th>
    <th>
    Ціна/шт
    </th>
    <th>
    К-сть
    </th>
    <th>
    Заг.ціна
    </th>
    </tr>`;
    totalprice = 0;
    basketItems.map((item) => {
      // if (item.price != null) {
      console.log(item.quantity)
        totalprice += item.price * item.quantity;
        container.innerHTML += `
        <tr id="row-${item.name}">
        <td>
        <button id="${
          item.name
        }"  class="delete-item" onclick="deleteRow(this)">
        
        <img src="../static/images/material-symbols_delete-outline.svg" width="30px"/>
        </button>
        </td>
        <td>
        <a href="/products/${item.id}">
        <img class="table-img" src="/static/images/products/${item.image}"/>
        </a>
        </td>
        <td>
        <a href="/products/${item.id}">
        ${item.name}
        </a>
        </td>
        <td>
         ${item.price.toFixed(2)}
        </td>
        <td>
        ${item.quantity}
        </td>
        <td>
         ${(item.price * item.quantity).toFixed(2)}
        </td>
        </tr>`;
      // }
      price.innerText = totalprice.toFixed(2);
    });
  }
}
updateBasket();

function deleteRow(button) {
  basketItems = basketItems.filter((item) => item.name != button.id);
  localStorage.setItem("basket", JSON.stringify(basketItems));
  button.closest("tr").remove();
  updateBasket();
  setBuyCard();
}
const favCard = document.querySelectorAll(".tofav");
let likeItemsProducts = JSON.parse(localStorage.getItem("likelist"));

function setFavCard() {
  favCard.forEach((item) => {
    likeItems = JSON.parse(localStorage.getItem("likelist"));
    if (likeItems.some((element) => element.id === item.dataset.id)) {
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
    parseFloat(item.dataset.price)
  );
}
function toggleToBuy(item) {
  basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
  if (!basketItemsToBuy.some((element) => element.id === item.dataset.id)) {
    addingToBuy(item);
    item.classList.add("fav-exist");
    window.dispatchEvent(new CustomEvent("addedToBasket"));
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
window.addEventListener("storage", () => {
  setFavCard();
  setBuyCard();
  updateBasket();
});
window.addEventListener("addedToBasket", ()=>{
  setBuyCard();
  updateBasket();
})
