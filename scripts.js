const images = [
  'images/wireless/trial1.csv_barplot.png',
  'images/wireless/trial1.csv_scatterplot.png'
];
let current = 0;
const slideImg = document.getElementById('slide-img');
const yearSpan = document.getElementById('year');
setInterval(() => {
  current = (current + 1) % images.length;
  slideImg.src = images[current];
}, 3000);
yearSpan.textContent = new Date().getFullYear();
