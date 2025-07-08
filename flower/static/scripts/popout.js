document.getElementById("close-btn").addEventListener("click", () => {
  document.getElementById("popout").style.display = "none";
});

const container = document.getElementById("popout-table");
let basketItems = JSON.parse(localStorage.getItem("basket"));
const price = document.getElementById("final-price");
let totalprice = 0;

function updatePopout() {
  basketItems = JSON.parse(localStorage.getItem("basket"));
  totalprice = 0;
  const deleteIconUrl = "/static/images/material-symbols_delete-outline.svg";
  container.innerHTML = "";
  if (basketItems.length > 0) {
    basketItems.map((item) => {
      totalprice += item.price * item.quantity;
      container.innerHTML += `
            <hr class="popout-hr">
            <tr id="row-${item.name}">
            <td style="border:none">
            <button id="${
              item.name
            }"  class="popout-delete" onclick="deletePopoutRow(this)">
            <img src="${deleteIconUrl}" width="30px"/>
            </button>
            </td>
            <td style="border:none">
            <a href="/products/${item.id}">
            <img src="/static/images/products/${item.image}" width="50px"/>
            </a>
            </td>
            <td style="border:none">
            <a href="/products/${item.id}">
            ${item.name}
            </a>
            </td>
            <td style="border:none">
            ${item.quantity} шт.
            </td>
            <td style="border:none">
            ${(item.quantity * item.price).toFixed(2)} грн
            </td>
            </tr>
            `;
    });
  }
  price.innerText = "До сплати: " + totalprice.toFixed(2) + " грн";
}
updatePopout();

function deletePopoutRow(button) {
  basketItems = basketItems.filter((item) => item.name != button.id);
  localStorage.setItem("basket", JSON.stringify(basketItems));
  button.closest("tr").remove();
  updatePopout();
}
const buy_popout = document.querySelectorAll(".buy-btn");
buy_popout.forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.dataset.id;
    const name = item.dataset.name;
    const image = item.dataset.image;
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(document.getElementById("quantity").innerText);
    addToBasket(id, name, image, price, quantity);
    updatePopout();
  });
});
