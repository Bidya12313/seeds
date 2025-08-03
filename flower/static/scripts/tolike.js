const fav = document.querySelectorAll(".tofav");
let likeItems = JSON.parse(localStorage.getItem("likelist"));
fav.forEach((item) => {
  item.addEventListener("click", () => {
    likeItems = JSON.parse(localStorage.getItem("likelist"));
    const id = item.dataset.id;
    if (likeItems.some((item) => item.id === id)) {
      likeItems = likeItems.filter((element) => element.id !== id);
      if(likeItems.length === 0) likeItems = [];
      localStorage.setItem("likelist", JSON.stringify(likeItems));
      item.classList.remove("fav-exist");
    } else {
      const name = item.dataset.name;
      const image = item.dataset.image;
      const price = parseFloat(item.dataset.price);
      addToLikelist(id, name, image, price);
      item.classList.add("fav-exist");
    }
  });
});