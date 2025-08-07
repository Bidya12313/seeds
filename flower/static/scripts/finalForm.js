const container = document.getElementById("basket");
let basketItems = JSON.parse(localStorage.getItem("basket"));
const price = document.getElementById("price");
let totalprice = 0;
function updateBasket() {
  basketItems = JSON.parse(localStorage.getItem("basket"));
  if (basketItems.length === 0) {
    document.getElementById("sum-text").style.display = "none";
    container.innerHTML = "";
  } else {
    document.getElementById("sum-text").style.display = "flex";
    container.innerHTML = `<tr>
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
      totalprice += item.price * item.quantity;
      container.innerHTML += `
      <tr id="row-${item.name}">
        <td>
        <a href="/products/${item.id}">
        <img class="table-img" src="/static/images/products/${item.image}"/>
        </a>
        </td>
        <td>
        <a href="/products/${item.id}">${item.name}</a>
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
    });
    price.innerText = totalprice.toFixed(2);
  }
}
updateBasket();
function deleteRow(button) {
  basketItems = basketItems.filter((item) => item.name != button.id);
  localStorage.setItem("basket", JSON.stringify(basketItems));
  button.closest("tr").remove();
  updateBasket();
}

document.querySelector(".final-form").addEventListener("submit", function (event) {
  event.preventDefault();

  if (!basketItems || basketItems.length === 0) {
    alert("Кошик порожній");
    return;
  }

const customer_data = {
  name: document.getElementById("client-name").value,
  contact: document.getElementById("client-phone").value,
  mail: document.getElementById("email").value,
  address: document.getElementById("client-post").value,
  payment: document.getElementById("client-payment").value
};

  fetch("/make_order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    
    body: JSON.stringify({
      basket: basketItems,
      client_total: totalprice,
      customer: customer_data
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        localStorage.removeItem("basket");
        window.location.href = "/order_success";
      } else if (data.status === "redirect" && data.location) {
        window.location.href = data.location;
      } else {
        alert("Помилка: " + (data.message || "невалідні дані."));
      }
    })
    .catch(error => {
      console.error("Помилка при надсиланні замовлення:", error);
      alert("Виникла технічна помилка. Спробуйте пізніше.");
    });
});