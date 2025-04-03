cat_arr.forEach((item)=>{
  document.getElementById('card-container').innerHTML+=`
 <a href="/products?category=${encodeURIComponent(item.slug)}">
                    <div class="cat-card">
                        <img class="cat-card-img" src="${item.image}"/>
                        <div class="cat-card-name">
                        ${item.name}
                        </div>
                    </div>
                </a>`;
});