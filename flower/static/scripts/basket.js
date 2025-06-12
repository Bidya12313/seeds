const container = document.getElementById("basket");
let basketItems = JSON.parse(localStorage.getItem("basket"));
const price = document.getElementById("price");
let totalprice = 0;
console.log(basketItems);
function updateBasket() {
  basketItems = JSON.parse(localStorage.getItem("basket"));
  if(basketItems.length === 0){
    document.getElementById("no-items").style.display = "block";
      document.getElementById("continue-btn").style.display = "none";
      document.getElementById("buy-btn").style.display = "none";
    document.getElementById("sum-text").style.display = "none";
    container.innerHTML = "";
  }
  else{
    document.getElementById("no-items").style.display = "none";
      document.getElementById("continue-btn").style.display = "block";
      document.getElementById("buy-btn").style.display = "block";
      document.getElementById("sum-text").style.display = "flex";
    container.innerHTML=`<tr>
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
      totalprice +=item.price * item.quantity;
      console.log(totalprice);
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