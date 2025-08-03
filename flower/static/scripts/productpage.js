// const pictures = document.querySelectorAll(".thumbnail-photo");
// const currentPic = document.getElementById("main-photo");
// let slideIndex = 1;
const buyBtn = document.getElementsByClassName("buy-btn")[0];
// pictures.forEach((pic, index) => {
//   pic.addEventListener("click", () => {
//     currentPic.src = pic.src;
//     pictures[slideIndex - 1].classList.remove("choose");
//     slideIndex = index + 1;
//     pic.classList.add("choose");
//   });
// });

// function plusSlides(n) {
//   pictures[slideIndex - 1].classList.remove("choose");
//   showSlides((slideIndex += n));
// }

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// function showSlides(n) {
//   if (n > pictures.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = pictures.length;
//   }
//   currentPic.src = pictures[slideIndex - 1].src;
//   pictures[slideIndex - 1].classList.add("choose");
// }

// const plus = document.getElementById("plus");
// const minus = document.getElementById("minus");
// const quantity = document.getElementById("quantity");
// let currentq = 1;

// plus.addEventListener("click", () => {
//   currentq++;
//   quantity.innerText = currentq;
// });
// minus.addEventListener("click", () => {
//   if (currentq > 1) {
//     currentq--;
//     quantity.innerText = currentq;
//   }
// });

// const buyBtn = document.getElementsByClassName("buy-btn")[0];
// const productId = buyBtn.dataset.id;

// let exists = JSON.parse(localStorage.getItem("basket")).some(
//   (item) => item.id === productId
// );
// if (exists) {
//   buyBtn.innerText = "У кошику!";
// }
// function checkBuyBtn() {
//   exists = JSON.parse(localStorage.getItem("basket")).some(
//     (item) => item.id === productId
//   );
//   console.log(exists)
//   if(buyBtn.innerHTML === "У кошику!"&&exists){
//     window.location.href = "/basket.html";
//   }
//   if (!exists) {
//     buyBtn.innerText = "Купити";
//     updatePopout();
//   } else {
//     buyBtn.innerText = "У кошику!";
//   }
// }
// function updBuyBtn(){
//   buyBtn.addEventListener("click", () => {
//     checkBuyBtn();
//   });
// }
// updBuyBtn();
// const favBtn = document.getElementsByClassName("fav-btn")[0];

// let existsFav = JSON.parse(localStorage.getItem("likelist")).some(
//   (item) => item.id === productId
// );
// if (existsFav) {
//   favBtn.classList.add("fav-exist");
// }

// favBtn.addEventListener("click", () => {
//   favBtn.classList.remove("fav-exist");
// });

// const favCard = document.querySelectorAll(".tofav");
// let likeItemsProducts = JSON.parse(localStorage.getItem("likelist"));
// function setFavCard() {
//   favCard.forEach((item) => {
//     likeItemsProducts = JSON.parse(localStorage.getItem("likelist"));
//     if (likeItemsProducts.some((element) => element.id === item.dataset.id)) {
//       item.classList.add("fav-exist");
//     } else if (item.classList.contains("fav-exist")) {
//       item.classList.remove("fav-exist");
//     }
//   });
// }
// setFavCard();
// const buyCard = document.querySelectorAll(".tobuy");
// let basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
// function setBuyCard() {
//   buyCard.forEach((item) => {
//     const id = item.dataset.id;
//     item.addEventListener("click", () => {
//       basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
//       if (
//         item.classList.contains("fav-exist") &&
//         basketItemsToBuy.some((item) => item.id === id)
//       ) {
//         window.location.href = "/basket.html";
//         console.log(item.classList);
//       } else if (!basketItemsToBuy.some((item) => item.id === id)) {
//         const name = item.dataset.name;
//         const image = item.dataset.image;
//         const price = parseFloat(item.dataset.price);
//         addToBasket(id, name, image, price);
//         item.classList.add("fav-exist");
//       }
//     });
//     if (basketItemsToBuy.some((item) => item.id === id)) {
//       item.classList.add("fav-exist");
//     } else if (item.classList.contains("fav-exist")) {
//       item.classList.remove("fav-exist");
//     }
//   });
// }
// setBuyCard();
// window.addEventListener("storage", () => {
//   let existsFav = JSON.parse(localStorage.getItem("likelist")).some(
//     (item) => item.id === productId
//   );
//   if (existsFav) {
//     favBtn.classList.add("fav-exist");
//   } else if (favBtn.classList.contains("fav-exist")) {
//     favBtn.classList.remove();
//   }
//   setFavCard();
//   setBuyCard();
//   updBuyBtn();
// });
// window.addEventListener("deleteRowInPopout", () => {
//   updBuyBtn();
// });
const pictures = document.querySelectorAll(".thumbnail-photo");
const currentPic = document.getElementById("main-photo");
let slideIndex = 1;

pictures.forEach((pic, index) => {
  pic.addEventListener("click", () => {
    currentPic.src = pic.src;
    pictures[slideIndex - 1].classList.remove("choose");
    slideIndex = index + 1;
    pic.classList.add("choose");
  });
});

function plusSlides(n) {
  pictures[slideIndex - 1].classList.remove("choose");
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  if (n > pictures.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = pictures.length;
  }
  currentPic.src = pictures[slideIndex - 1].src;
  pictures[slideIndex - 1].classList.add("choose");
}

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const quantity = document.getElementById("quantity");
let currentq = 1;

plus.addEventListener("click", () => {
  currentq++;
  quantity.innerText = currentq;
});
minus.addEventListener("click", () => {
  if (currentq > 1) {
    currentq--;
    quantity.innerText = currentq;
  }
});

const favBtn = document.getElementsByClassName("fav-btn")[0];
const productId = buyBtn.dataset.id;

let existsFav = JSON.parse(localStorage.getItem("likelist")).some(
  (item) => item.id === productId
);
if (existsFav) {
  favBtn.classList.add("fav-exist");
}

favBtn.addEventListener("click", () => {
  favBtn.classList.remove("fav-exist");
});

const favCard = document.querySelectorAll(".tofav");
let likeItemsProducts = JSON.parse(localStorage.getItem("likelist"));
function setFavCard() {
  favCard.forEach((item) => {
    likeItemsProducts = JSON.parse(localStorage.getItem("likelist"));
    if (likeItemsProducts.some((element) => element.id === item.dataset.id)) {
      item.classList.add("fav-exist");
    } else if (item.classList.contains("fav-exist")) {
      item.classList.remove("fav-exist");
    }
  });
}
setFavCard();

const buyCard = document.querySelectorAll(".tobuy");
let basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
function addingToBuy(item) {
  addToBasket(
    item.dataset.id,
    item.dataset.name,
    item.dataset.image,
    parseFloat(item.dataset.price)
  );
}
function toggleToBuy(item) {
  basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
  if (!basketItemsToBuy.some((element) => element.id === item.dataset.id)) {
    addingToBuy(item);
    item.classList.add("fav-exist");
    window.dispatchEvent(new CustomEvent("addedToBasket"));
  } else if (item.classList.contains("fav-exist")) {
    window.location.href = "/basket.html";
  }
}
buyCard.forEach((item) => {
  item.addEventListener("click", () => {
    toggleToBuy(item);
  });
});
function setBuyCard() {
  buyCard.forEach((item) => {
    const id = item.dataset.id;
    basketItemsToBuy = JSON.parse(localStorage.getItem("basket"));
    if (basketItemsToBuy.some((item) => item.id === id)) {
      item.classList.add("fav-exist");
    } else if (item.classList.contains("fav-exist")) {
      item.classList.remove("fav-exist");
    }
  });
}
setBuyCard();

let exists = JSON.parse(localStorage.getItem("basket")).some(
  (item) => item.id === productId
);
if (exists) {
  buyBtn.innerText = "У кошику!";
}

function checkBuyBtn() {
  const basket = JSON.parse(localStorage.getItem("basket"));
  const exists = basket.some((item) => item.id === productId);

  buyBtn.innerText = exists ? "У кошику!" : "Купити";
}
function handleBuyClick() {
  if (buyBtn.innerHTML === "У кошику!") {
    window.location.href = "/basket";
  }
  setBuyCard();
}
buyBtn.addEventListener("click", () => {
  handleBuyClick();
  checkBuyBtn();
});
window.addEventListener("storage", () => {
  let existsFav = JSON.parse(localStorage.getItem("likelist")).some(
    (item) => item.id === productId
  );
  if (existsFav) {
    favBtn.classList.add("fav-exist");
  } else if (favBtn.classList.contains("fav-exist")) {
    favBtn.classList.remove();
  }
  setFavCard();
  setBuyCard();
  checkBuyBtn();
});
window.addEventListener("deleteRowInPopout", () => {
  checkBuyBtn();
  setBuyCard();
});
window.addEventListener("addedToBasket", () => {
  updatePopout();
  checkBuyBtn();
  setBuyCard();
});
