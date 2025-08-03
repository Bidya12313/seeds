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
    { name: "Підкормки і ЗЗР", slug: "pidkormky-i-zzr", image: "../static/images/dobryva-cat.jpg" },
    { name: "Овочі", slug: "ovochi", image: "../static/images/ovochi2025.jpg" },
    { name: "Алісум", slug: "alisum", image: "../static/images/alisum2025.jpg" },
    { name: "Бакопа", slug: "bakopa", image: "../static/images/bakopa2025.jpg" },
    { name: "Баль&shy;за&shy;міни", slug: "balzaminy", image: "../static/images/balz2025.jpg" },
    { name: "Баль&shy;за&shy;міни Но&shy;во&shy;гві&shy;ней&shy;ські", slug: "balzaminy-novogvinejski", image: "../static/images/Balzaminy-Novogvinejski.jpg" },
    { name: "Бархатці", slug: "barhattsi", image: "../static/images/barhattsi2025.jpg" },
    { name: "Бегонії", slug: "begoniyi", image: "../static/images/Begon2025.jpg" },
    { name: "Вербени", slug: "verbeny", image: "../static/images/verbeny2025.jpg" },
    { name: "Діхондра", slug: "dihondra", image: "../static/images/Dihondra.jpg" },
    { name: "Еустома Махрова", slug: "eustoma-mahrova", image: "../static/images/eustoma-mahrova.jpg" },
    { name: "Лобелія", slug: "lobeliya", image: "../static/images/Lobeliya.jpg" },
    { name: "Остеоспермум", slug: "osteospermum", image: "../static/images/Osteospermum.jpg" },
    { name: "Пеларгонії", slug: "pelargoniyi", image: "../static/images/Pelargoniyi.jpg" },
    { name: "Петунії Ампельні", slug: "petuniyi-ampelni", image: "../static/images/Ampelni-petuniyi.jpg" },
    { name: "Петунії Крупноквіткові", slug: "petuniyi-krupnokvitkovi", image: "../static/images/krupnokvitkovi2025.jpg" },
    { name: "Петунії Махрові", slug: "petuniyi-mahrovi", image: "../static/images/Mahrovi2025.jpg" },
    { name: "Катарантуси", slug: "katarantusy", image: "../static/images/katarantusy2025.jpg" },
    { name: "Інші квіти", slug: "inshi-kvity", image: "../static/images/inshi2025.jpg" }
  ];
  
cat_arr.forEach((item)=>{
    document.getElementById('categories-dropdown').innerHTML+=`
     <li>
                            <a href="/products?category=${encodeURIComponent(item.slug)}" class="category">${item.name}</a>
                        </li>`
})