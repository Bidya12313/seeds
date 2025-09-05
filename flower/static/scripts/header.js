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
    name: "Багаторічні рослини",
    slug: "bagatorichni-roslyny",
    image: "../static/images/bagatorichni_roslyny.png",
  },
  {
    name: "Однорічні рослини",
    slug: "odnorichni-roslyny",
    image: "../static/images/odnorichni_roslyny.png",
  },
  {
    name: "Дворічні рослини",
    slug: "dvorichni-roslyny",
    image: "../static/images/dvorichni_roslyny.png",
  },
  {
    name: "Листяні дерева та кущі",
    slug: "listyani-dereva-ta-kushchi",
    image: "../static/images/listyani_dereva.png",
  },
  {
    name: "Хвойники",
    slug: "khvoynyky",
    image: "../static/images/hvoiniki.png",
  },
  {
    name: "Вкорінені живці",
    slug: "vkorineni-zhyvtsi",
    image: "../static/images/vkorineni.png",
  },
  {
    name: "Фіалки",
    slug: "fialky",
    image: "../static/images/fialky.png",
  },
  {
    name: "Інші кімнатні рослини",
    slug: "inshi-kimnatni-roslyny",
    image: "../static/images/inshi_kimnatny_roslyny.png",
  },
  {
    name: "Добрива та ЗЗР",
    slug: "dobryva-ta-zzr",
    image: "../static/images/dobryva_ta_zzr.png",
  },
  {
    name: "Ґрунти та субстрати",
    slug: "grunty-ta-substraty",
    image: "../static/images/grunty_ta_substraty.png",
  },
  {
    name: "Садовий інвентар",
    slug: "sadovyi-inventar",
    image: "../static/images/sadovyi_inventar.png",
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
