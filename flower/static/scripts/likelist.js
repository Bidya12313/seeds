const container_like = document.getElementById("likelist");
let likeItems = JSON.parse(localStorage.getItem("likelist"));

const favCard = document.querySelectorAll(".tofav");
favCard.forEach((item) => {
  item.addEventListener("click", () => {
    let likeItemsToLike = JSON.parse(localStorage.getItem("likelist"));
    const id = item.dataset.id;
    if (likeItemsToLike.some((item) => item.id === id)) {
      likeItemsToLike = likeItemsToLike.filter((element) => element.id !== id);
      if (likeItemsToLike.length === 0) likeItemsToLike = [];
      localStorage.setItem("likelist", JSON.stringify(likeItemsToLike));
      item.classList.remove("fav-exist");
    } else {
      const name = item.dataset.name;
      const image = item.dataset.image;
      const price = parseFloat(item.dataset.price);
      const status = item.dataset.status;
      addToLikelist(id, name, image, price, status);
      item.classList.add("fav-exist");
    }
    window.dispatchEvent(new CustomEvent("updatedLikeList"));
  });
});

function updateLikeList() {
  likeItems = JSON.parse(localStorage.getItem("likelist"));
  if (likeItems.length === 0) {
    document.getElementById("no-items").style.display = "block";
    container_like.innerHTML = "";
  } else {
    document.getElementById("no-items").style.display = "none";
    container_like.innerHTML = `                    <th>
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
        </tr>`;
    likeItems.map((item) => {
      const btnToStatus =
        item.status === "active"
          ? `<button id="${item.name}" class="add-to-basket-btn" data-id="${item.id}" data-name="${item.name}" 
                data-image="${item.image}" 
                data-price="${item.price}">
                Додати до кошика
                </button>`
          : `<button id="${item.name}" class="not-add-to-basket-btn">Не в наявності</button>`;
      container_like.innerHTML += `
            <tr>
            <td>
            <button id="${
              item.name
            }"  class="delete-item" onclick="deleteRow(this)">
                
                <img src="../static/images/material-symbols_delete-outline.svg" width="30px"/>
                </button>
                </td>
                <td>
                <a href="/products/${item.id}">
                <img class="table-img" src="../static/images/products/${
                  item.image
                }"/>
                </a>
                </td>
                <td>
                <a href="/products/${item.id}">
                ${item.name}
                </a>
                </td>
                <td>
                ${Number(item.price).toFixed(2)}
                </td>
                <td>
                ${btnToStatus}
                </td>
                </tr>`;
    });
    setupAddToBasketBtns();
  }
}
updateLikeList();
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
window.addEventListener("storage", () => {
  updateLikeList();
  setFavCard();
  setBuyCard();
});

function deleteRow(button) {
  likeItems = likeItems.filter((item) => item.name != button.id);
  localStorage.setItem("likelist", JSON.stringify(likeItems));
  button.closest("tr").remove();
  updateLikeList();
  setFavCard();
}

function setupAddToBasketBtns() {
  const toBasketBtns = document.querySelectorAll(".add-to-basket-btn");
  toBasketBtns.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      const name = item.dataset.name;
      const image = item.dataset.image;
      const price = parseFloat(item.dataset.price);
      addToBasket(id, name, image, price, 1);
      deleteRow(item);
      updatePopout();
      setFavCard();
      setBuyCard();
    });
  });
}
window.addEventListener("deleteRowInPopout", () => {
  setBuyCard();
});
window.addEventListener("addedToBasket", () => {
  updatePopout();
  setBuyCard();
});
window.addEventListener("updatedLikeList", () => {
  updateLikeList();
});
