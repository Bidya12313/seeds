document.getElementById("close-btn").addEventListener("click", () => {
  document.getElementById("popout").style.display = "none";
});

const container = document.getElementById("popout-table");
let basketItems = JSON.parse(localStorage.getItem("basket"));
const price = document.getElementById("final-price");
let totalprice = 0;
console.log(basketItems);

function updatePopout() {
    basketItems = JSON.parse(localStorage.getItem("basket"));
    totalprice=0;
    container.innerHTML = "";
    basketItems.map((item) => {
        totalprice += item.price * item.quantity;
        console.log(totalprice);
        container.innerHTML += `
        <hr class="popout-hr">
          <tr id="row-${item.name}">
              <td style="border:none">
                  <button id="${item.name}"  class="popout-delete" onclick="deletePopoutRow(this)">
                      <img src="../static/images/material-symbols_delete-outline.svg" width="30px"/>
                      </button>
              </td>
              <td style="border:none">
                  <a href="productpage.html">
                      <img src="../static/${item.image}" width="50px"/>
                  </a>
              </td>
              <td style="border:none">
                  <a href="productpage.html">
                      ${item.name}
                  </a
              </td>
              <td style="border:none">
                  ${item.price} грн
              </td>
              <td style="border:none">
                   ${item.quantity} шт.
              </td>
              <td style="border:none">
              ${item.quantity * item.price} грн
              </td>
              </tr>
                          `;
      });
      price.innerText = "До сплати: " + totalprice + " грн";
}
updatePopout();

function deletePopoutRow(button) {
  console.log(button);
  basketItems = basketItems.filter((item) => item.name != button.id);
  localStorage.setItem("basket", JSON.stringify(basketItems));
  button.closest("tr").remove();
  updatePopout();
}
const buy_popout = document.querySelectorAll(".tobuy");
buy_popout.forEach((item)=>{
    item.addEventListener('click',()=>{
        console.log("click");
        addToBasket('name', 'images/dobryva-cat.jpg', 30, 2);
        updatePopout();
    })
  })
