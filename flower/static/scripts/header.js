const category_arrow_header_full = document.getElementById("cat-arr-full");
function showDropDown() {
  if (category_arrow_header_full.textContent === "▲") {
    category_arrow_header_full.textContent = "▼";
  } else {
    category_arrow_header_full.textContent = "▲";
  }
  document.getElementById("categories-dropdown-full").classList.toggle("show");
}
function hideDropDown() {
  if (category_arrow_header_full.textContent === "▲") {
    category_arrow_header_full.textContent = "▼";
  } else {
    category_arrow_header_full.textContent = "▲";
  }
  document.getElementById("categories-dropdown-full").classList.remove("show");
}
const category_arrow_header = document.getElementById("cat-arr");
function toggleDropDown() {
  console.log(
    document.getElementById("categories-dropdown").classList.contains("show")
  );
  if (
    document.getElementById("categories-dropdown").classList.contains("show")
  ) {
    category_arrow_header.textContent = "▼";
  } else {
    category_arrow_header.textContent = "▲";
  }
  document.getElementById("categories-dropdown").classList.toggle("show");
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
  {
    name: "Підкормки і ЗЗР",
    slug: "pidkormky-i-zzr",
    image: "../static/images/dobryva-cat.jpg",
  },
  { name: "Овочі", slug: "ovochi", image: "../static/images/ovochi2025.jpg" },
  { name: "Алісум", slug: "alisum", image: "../static/images/alisum2025.jpg" },
  { name: "Бакопа", slug: "bakopa", image: "../static/images/bakopa2025.jpg" },
  {
    name: "Баль&shy;за&shy;міни",
    slug: "balzaminy",
    image: "../static/images/balz2025.jpg",
  },
  {
    name: "Баль&shy;за&shy;міни Но&shy;во&shy;гві&shy;ней&shy;ські",
    slug: "balzaminy-novogvinejski",
    image: "../static/images/Balzaminy-Novogvinejski.jpg",
  },
  {
    name: "Бархатці",
    slug: "barhattsi",
    image: "../static/images/barhattsi2025.jpg",
  },
  {
    name: "Бегонії",
    slug: "begoniyi",
    image: "../static/images/Begon2025.jpg",
  },
  {
    name: "Вербени",
    slug: "verbeny",
    image: "../static/images/verbeny2025.jpg",
  },
  {
    name: "Діхондра",
    slug: "dihondra",
    image: "../static/images/Dihondra.jpg",
  },
  {
    name: "Еустома Махрова",
    slug: "eustoma-mahrova",
    image: "../static/images/eustoma-mahrova.jpg",
  },
  { name: "Лобелія", slug: "lobeliya", image: "../static/images/Lobeliya.jpg" },
  {
    name: "Остеоспермум",
    slug: "osteospermum",
    image: "../static/images/Osteospermum.jpg",
  },
  {
    name: "Пеларгонії",
    slug: "pelargoniyi",
    image: "../static/images/Pelargoniyi.jpg",
  },
  {
    name: "Петунії Ампельні",
    slug: "petuniyi-ampelni",
    image: "../static/images/Ampelni-petuniyi.jpg",
  },
  {
    name: "Петунії Крупноквіткові",
    slug: "petuniyi-krupnokvitkovi",
    image: "../static/images/krupnokvitkovi2025.jpg",
  },
  {
    name: "Петунії Махрові",
    slug: "petuniyi-mahrovi",
    image: "../static/images/Mahrovi2025.jpg",
  },
  {
    name: "Катарантуси",
    slug: "katarantusy",
    image: "../static/images/katarantusy2025.jpg",
  },
  {
    name: "Інші квіти",
    slug: "inshi-kvity",
    image: "../static/images/inshi2025.jpg",
  },
];

cat_arr.forEach((item) => {
  document.getElementById("categories-dropdown").innerHTML += `
<a href="/products/category/${encodeURIComponent(item.slug)}" class="category">
  <li> ${item.name} </li>
  </a>`;
  document.getElementById("categories-dropdown-full").innerHTML += `
<a href="/products/category/${encodeURIComponent(item.slug)}" class="category">
  <li> ${item.name} </li>
  </a>`;
});
