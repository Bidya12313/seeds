function checkLikeList() {
  if (!localStorage.getItem("likelist")) {
    localStorage.setItem("likelist", JSON.stringify([]));
  }
}
function checkBasket() {
  if (!localStorage.getItem("basket")) {
    localStorage.setItem("basket", JSON.stringify([]));
  }
}
checkLikeList();
checkBasket();
