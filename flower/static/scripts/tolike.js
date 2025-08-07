const fav = document.querySelectorAll(".tofav");
let rawLikeList = localStorage.getItem("likelist");
if (!rawLikeList) {
  localStorage.setItem("likelist", JSON.stringify([]));
  rawLikeList = "[]";
}
let likeItems = JSON.parse(rawLikeList);
fav.forEach((item) => {
  item.addEventListener("click", () => {
    rawLikeList = localStorage.getItem("likelist");
    if (!rawLikeList) {
      localStorage.setItem("likelist", JSON.stringify([]));
      rawLikeList = "[]";
    }
    likeItems = JSON.parse(rawLikeList);
    const id = item.dataset.id;
    if (likeItems.some((item) => item.id === id)) {
      likeItems = likeItems.filter((element) => element.id !== id);
      if (likeItems.length === 0) likeItems = [];
      localStorage.setItem("likelist", JSON.stringify(likeItems));
      item.classList.remove("fav-exist");
    } else {
      const name = item.dataset.name;
      const image = item.dataset.image;
      const price = parseFloat(item.dataset.price);
      const status = item.dataset.status;
      addToLikelist(id, name, image, price, status);
      item.classList.add("fav-exist");
    }
  });
});
