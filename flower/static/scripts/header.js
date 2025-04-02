function showDropDown(){
    document.getElementById("categories-dropdown").classList.toggle("show");
}
function hideDropDown(){
    document.getElementById("categories-dropdown").classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const menu = document.getElementById("menu");
  
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("open");
    });
    menuClose.addEventListener("click", function () {
      menu.classList.remove("open");
  });
  });

  const cat_arr = [
    { name: "Підкормки і ЗЗР", image: "../static/images/dobryva-cat.jpg" },
    { name: "Овочі", image: "../static/images/ovochi2025.jpg" },
    { name: "Алісум", image: "../static/images/alisum2025.jpg" },
    { name: "Бакопа", image: "../static/images/bakopa2025.jpg" },
    { name: "Бальзаміни", image: "../static/images/balz2025.jpg" },
    { name: "Бальзаміни Новогвінейські", image: "../static/images/Balzaminy-Novogvinejski.jpg" },
    { name: "Бархатці", image: "../static/images/barhattsi2025.jpg" },
    { name: "Бегонії", image: "../static/images/Begon2025.jpg" },
    { name: "Вербени", image: "../static/images/verbeny2025.jpg" },
    { name: "Діхондра", image: "../static/images/Dihondra.jpg" },
    { name: "Еустома Махрова", image: "../static/images/eustoma-mahrova.jpg" },
    { name: "Лобелія", image: "../static/images/Lobeliya.jpg" },
    { name: "Остеоспермум", image: "../static/images/Osteospermum.jpg" },
    { name: "Пеларгонії", image: "../static/images/Pelargoniyi.jpg" },
    { name: "Петунії Ампельні", image: "../static/images/Ampelni-petuniyi.jpg" },
    { name: "Петунії Крупноквіткові", image: "../static/images/krupnokvitkovi2025.jpg" },
    { name: "Петунії Махрові", image: "../static/images/Mahrovi2025.jpg" },
    { name: "Катарантуси", image: "../static/images/katarantusy2025.jpg" },
    { name: "Інші квіти", image: "../static/images/inshi2025.jpg" }
];
cat_arr.forEach((item)=>{
    document.getElementById('categories-dropdown').innerHTML+=`
     <li>
                            <a href="products.html?category=${item.name}" class="category">${item.name}</a>
                        </li>`
})