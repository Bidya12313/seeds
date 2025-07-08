const titles = document.querySelectorAll(".bar-name");
titles.forEach((item) => {
  item.addEventListener("click", () => {
    const ul = document.querySelector(`.${item.id}`);
    ul.style.display = ul.style.display === "block" ? "none" : "block";
  });
});

let params = new URLSearchParams(document.location.search);
let category = params.get("category");
cat_arr.forEach((item) => {
  if (item.name === category) {
    document.getElementById("category-list").innerHTML += `
                            <a href="prducts?category=${item.slug}"><li id="${item.name}" class="categories chosen">
                            ${item.name} →
                        </li></a>`;
  } else {
    document.getElementById("category-list").innerHTML += `
                            <a href="products?category=${item.slug}"><li id="${item.name}" class="categories">
                            ${item.name} →
                        </li></a>`;
  }
});
