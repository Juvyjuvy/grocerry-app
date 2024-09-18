let currentSlide = 0;
const slides = document.querySelectorAll ('.container');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-change slides every 5 seconds
setInterval(nextSlide, 2000);

// You can also manually trigger `nextSlide()` function or showSlide(index) if needed
document.getElementById('get-started').addEventListener('click', function() {
    window.location.href = 'signin.html'; // Redirects to the sign-in page
});

document.addEventListener('DOMContentLoaded', function () {
    var createAccountBtn = document.getElementById('create-account-btn');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', function() {
            // Use relative path, assuming createaccount.html is in the same directory
            window.location.href = 'createaccount.html';
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // Add to favorites
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
  
    favoriteButtons.forEach(button => {
      button.addEventListener("click", function() {
        const itemName = this.getAttribute("data-item");
        const itemPrice = this.getAttribute("data-price");
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        // Check if the item is already in favorites
        if (!favorites.some(fav => fav.name === itemName)) {
          favorites.push({ name: itemName, price: itemPrice });
          localStorage.setItem("favorites", JSON.stringify(favorites));
          alert(`${itemName} added to favorites!`);
        } else {
          alert(`${itemName} is already in favorites.`);
        }
      });
    });
  });