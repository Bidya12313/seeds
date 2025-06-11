const container = document.getElementById("basket");
let basketItems = JSON.parse(localStorage.getItem("basket"));
const price = document.getElementById("price");
let totalprice = 0;
console.log(basketItems);
function updateBasket() {
  basketItems = JSON.parse(localStorage.getItem("basket"));
  if(basketItems.length === 0){
    document.getElementById("sum-text").style.display = "none";
    container.innerHTML = "";
  }
  else{
      document.getElementById("sum-text").style.display = "flex";
    container.innerHTML=`<tr>
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
      totalprice +=item.price * item.quantity;
      console.log(totalprice);
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
  console.log(button);
  basketItems = basketItems.filter((item) => item.name != button.id);
  localStorage.setItem("basket", JSON.stringify(basketItems));
  button.closest("tr").remove();
  updateBasket();
}
