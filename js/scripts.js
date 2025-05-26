// ===== Dynamic Year in Footer =====
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// ===== Typewriter Effect for Hero Banner =====
document.addEventListener("DOMContentLoaded", () => {
  const bannerText = "Welcome to Jamal's Webpage";
  const bannerElement = document.querySelector(".herobanner");
  if (!bannerElement) return;

  let index = 0;
  bannerElement.textContent = "";

  function typeWriter() {
    if (index < bannerText.length) {
      bannerElement.textContent += bannerText.charAt(index);
      index++;
      setTimeout(typeWriter, 80);
    }
  }

  typeWriter();
});

// ===== Auto-Advancing Slideshow =====
document.addEventListener("DOMContentLoaded", () => {
  const imagePaths = [
    "images/wireless/trial1.csv_barplot.png",
    "images/wireless/trial1.csv_scatterplot.png",
    "images/wireless/trial2.csv_barplot.png",
    "images/wireless/trial2.csv_scatterplot.png",
    "images/wireless/trial3.csv_barplot.png",
    "images/wireless/trial3.csv_scatterplot.png",
    "images/wireless/trial4.csv_barplot.png",
    "images/wireless/trial4.csv_scatterplot.png",
    "images/wireless/trial5.csv_barplot.png",
    "images/wireless/trial5.csv_scatterplot.png",
    "images/wireless/trial6.csv_barplot.png",
    "images/wireless/trial6.csv_scatterplot.png"
  ];

  let currentIndex = 0;
  const slideImg = document.getElementById("slide-img");

  function updateSlide() {
    slideImg.src = imagePaths[currentIndex];
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    updateSlide();
  }

  if (slideImg) {
    updateSlide();
    setInterval(showNext, 4000); // change image every 4 seconds
  }
});
