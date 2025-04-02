
const listOfCardElements = document.querySelectorAll('.prod-card');
const cardContainer = document.querySelector('.card-container');
const prevCatBtn = document.querySelector('.prev-cat');
const nextCatBtn = document.querySelector('.next-cat');
const cardWidth = document.querySelector('.prod-card').offsetWidth + 20;
const totalCatSlides = listOfCardElements.length;
const pageWidth = 3 * cardWidth;

listOfCardElements.forEach((cardElement) => {
  cardElement.addEventListener('click', () => {
    cardContainer.scrollTo({ left: pageWidth, behavior: 'smooth' });
  });
});

prevCatBtn.addEventListener('click', () => {
    cardContainer.scrollBy({ left: -pageWidth, behavior: 'smooth' });
});

nextCatBtn.addEventListener('click', () => {
    cardContainer.scrollBy({ left: pageWidth, behavior: 'smooth' });
});