import { allBlogPostfetch } from "../api_calls/api_fetch.js";

let slideIndex = 1;


const plusSlides = (currentSlideIndex) => {
  showSlides(slideIndex += currentSlideIndex);
};

const currentSlide = (currentSlideIndex) => {
  showSlides(slideIndex = currentSlideIndex);
};

async function displayCarucel() {
    try {
      const posts = await allBlogPostfetch();
      const postsToDisplay = posts.data.slice(0, 3);
  
      const blogContainer = document.getElementById("image-crucell");
      blogContainer.innerHTML = `
        <div class="slideshow-container">
          ${postsToDisplay.map(
            (carucel) =>
              `<div class="mySlides fade post">
                <img src="${carucel.media.url}" alt="${carucel.media.alt}">
                <h3>${carucel.title}</h3>
              </div>`
          ).join('')}    
          <a class="prev" onclick="plusSlides(-1)">❮</a>
          <a class="next" onclick="plusSlides(1)">❯</a>
        </div>
        <br />
      `;

      const slides = document.querySelectorAll(".mySlides");
      postsToDisplay.forEach((post, index) => {
        const slide = slides[index];
        slide.addEventListener("click", () => {
          window.location.href = `HTML_files/blogpost.html?id=${post.id}`;
        });
      });
      showSlides(slideIndex);
    } catch (error) {
      console.error(
        "Det oppstod en feil ved henting av blogginnlegg for Ostlandet:",
        error
      );
    }
  }

function showSlides(currentSlideIndex) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');
  

  if (currentSlideIndex > slides.length) {
    slideIndex = 1;
  }
  if (currentSlideIndex < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
}

window.plusSlides = plusSlides;
window.currentSlide = currentSlide;

displayCarucel();
