const container_like = document.getElementById("likelist");
let likeItems = JSON.parse(localStorage.getItem("likelist"));
console.log(likeItems);
function updateLikeList(){
    likeItems = JSON.parse(localStorage.getItem("likelist"));
    if(likeItems.length === 0){
        document.getElementById("no-items").style.display = "block";
        document.getElementById("all-to-basket").style.display = "none";
        container_like.innerHTML = "";
    }
    else{
        document.getElementById("no-items").style.display = "none";
        document.getElementById("all-to-basket").style.display = "block";
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
        likeItems.map((item)=>{
            container_like.innerHTML+=`
            <tr>
            <td>
            <button id="${
                item.name
                }"  class="delete-item" onclick="deleteRow(this)">
                
                <img src="../static/images/material-symbols_delete-outline.svg" width="30px"/>
                </button>
                </td>
                <td>
                <img class="table-img" src="../static/${item.image}"/>
                </td>
                <td>
                ${item.name}
                </td>
                <td>
                ${item.price}
                </td>
                <td>
                <button id="${item.name}" class="add-to-basket-btn">
                Додати до кошика
                </button>
                </td>
                </tr>`;
            })
        }
    }
updateLikeList();

function deleteRow(button) {
    likeItems = likeItems.filter((item) => item.name != button.id);
    localStorage.setItem("likelist", JSON.stringify(likeItems));
    button.closest("tr").remove();
    updateLikeList();
  }
const fav = document.querySelectorAll(".tofav");
fav.forEach((item)=>{
  item.addEventListener('click',()=>{
    addToLikelist('name', 'images/dobryva-cat.jpg', 30);
    updateLikeList();
  })
})
const toBasketBtns = document.querySelectorAll(".add-to-basket-btn");
toBasketBtns.forEach((item)=>{
    item.addEventListener('click', ()=>{
        addToBasket(item.name, item.image, item.price, 1);
        deleteRow(item);
    })
})
const finalBtn = document.getElementById("all-to-basket");
finalBtn.addEventListener('click', ()=>{
    likeItems.forEach((i)=>{
        addToBasket(i.name, i.image, i.price, 1);
        deleteRow(i);
    })
})