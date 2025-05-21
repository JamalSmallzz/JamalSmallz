const images = [
  'trial1.csv_scatterplot.png',
  'trial1.csv_barplot.png',
  'trial2.csv_scatterplot.png',
  'trial2.csv_barplot.png',
  'trial3.csv_barplot.png',
  'trial5.csv_scatterplot.png',
  'trial5.csv_barplot.png'
];

let current = 0;
const slideImg = document.getElementById('slide-img');
const yearSpan = document.getElementById('year');

setInterval(() => {
  current = (current + 1) % images.length;
  slideImg.src = images[current];
}, 3000);

yearSpan.textContent = new Date().getFullYear();
