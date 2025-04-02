const pictures = document.querySelectorAll(".thumbnail-photo");
const currentPic = document.getElementById("main-photo");
let slideIndex = 1;
console.log(document.querySelectorAll(".thumbnail-photo"));
console.log(currentPic);
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
plus.addEventListener('click',()=>{
  currentq++;
  quantity.innerText = currentq;
})
minus.addEventListener('click', ()=>{
  if(currentq>1){
    currentq--;
  quantity.innerText = currentq;
  }
})

document.getElementById("buy-btn").addEventListener('click', ()=>{
  addToBasket("Name", pictures[0].src, 30, currentq);
  updatePopout();
})

