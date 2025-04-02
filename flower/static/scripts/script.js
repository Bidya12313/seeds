// const arr = [
//   { name: "Підкормки і ЗЗР", image: "images/dobryva-cat.jpg" },
//   { name: "Овочі", image: "images/ovochi2025.jpg" },
//   { name: "Алісум", image: "images/alisum2025.jpg" },
//   { name: "Бакопа", image: "images/bakopa2025.jpg" },
//   { name: "Бальзаміни", image: "images/balz2025.jpg" },
//   { name: "Бальзаміни Новогвінейські", image: "images/Balzaminy-Novogvinejski.jpg" },
//   { name: "Бархатці", image: "images/barhattsi2025.jpg" },
//   { name: "Бегонії", image: "images/Begon2025.jpg" },
//   { name: "Вербени", image: "images/verbeny2025.jpg" },
//   { name: "Діхондра", image: "images/Dihondra.jpg" },
//   { name: "Еустома Махрова", image: "images/eustoma-mahrova.jpg" },
//   { name: "Лобелія", image: "images/Lobeliya.jpg" },
//   { name: "Остеоспермум", image: "images/Osteospermum.jpg" },
//   { name: "Пеларгонії", image: "images/Pelargoniyi.jpg" },
//   { name: "Петунії Ампельні", image: "images/Ampelni-petuniyi.jpg" },
//   { name: "Петунії Крупноквіткові", image: "images/krupnokvitkovi2025.jpg" },
//   { name: "Петунії Махрові", image: "images/Mahrovi2025.jpg" },
//   { name: "Катарантуси", image: "images/katarantusy2025.jpg" },
//   { name: "Інші квіти", image: "images/inshi2025.jpg" }
// ];
// console.log(JSON.stringify(arr));
// arr.forEach((item)=>{
//   document.getElementById('card-container').innerHTML+=`
//    <div class="cat-card">
//                         <img class="cat-card-img" src="${item.image}" />
//                         <div class="cat-card-name">
//                             ${item.name}
//                         </div>
//                     </div>`;
// })

function showDropDown(){
  document.getElementById("categories-dropdown").classList.toggle("show");
}
function hideDropDown(){
  document.getElementById("categories-dropdown").classList.remove("show");
}
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

const listOfCardElements = document.querySelectorAll('.cat-card');
const cardContainer = document.querySelector('.card-container');
const indicatorContainer = document.querySelector('.indicator-container');
const prevCatBtn = document.querySelector('.prev-cat');
const nextCatBtn = document.querySelector('.next-cat');
const cardWidth = document.querySelector('.cat-card').offsetWidth + 20;
const totalCatSlides = listOfCardElements.length;
const pageWidth = 3 * cardWidth;

listOfCardElements.forEach((cardElement) => {
  cardElement.addEventListener('click', () => {
    cardContainer.scrollTo({ left: pageWidth, behavior: 'smooth' });
  });
});

// Scroll Left
prevCatBtn.addEventListener('click', () => {
    cardContainer.scrollBy({ left: -pageWidth, behavior: 'smooth' });
});

// Scroll Right
nextCatBtn.addEventListener('click', () => {
    cardContainer.scrollBy({ left: pageWidth, behavior: 'smooth' });
});

for (let i = 0; i < Math.ceil(totalCatSlides/3)-2; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (i === 0) indicator.classList.add('active'); // First one is active
    indicatorContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll('.indicator');

function updateIndicators() {
    let currentIndex = Math.round(cardContainer.scrollLeft / pageWidth);
    indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

cardContainer.addEventListener('scroll', () => {
    updateIndicators();
});


indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        cardContainer.scrollTo({ left: index * pageWidth, behavior: 'smooth' });
    });
});
