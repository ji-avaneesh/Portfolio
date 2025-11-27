// Typing animation
const typedText = document.querySelector(".typing-text");
const phrases = ["Frontend Developer", "Web Designer", "Software Tester"]; 
let phraseIndex = 0;
let letterIndex = 0; 
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    letterIndex--;
    typedText.textContent = currentPhrase.substring(0, letterIndex);
  } else {
    letterIndex++;
    typedText.textContent = currentPhrase.substring(0, letterIndex);
  }

  if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); 
    return;
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeEffect, isDeleting ? 80 : 120);
}

if (typedText) {
    document.addEventListener("DOMContentLoaded", typeEffect);
}

// Navbar toggle for mobile
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
}

// Close navbar on link click
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
  });
});


// --- FIXED CONTACT FORM CODE ---

const contactForm = document.getElementById('contactForm'); 
const submitBtn = contactForm ? contactForm.querySelector('input[type="submit"]') : null;
const popup = document.getElementById('thankYouPopup'); 

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const originalText = submitBtn.value; 
        submitBtn.value = "Sending..."; 
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                if (popup) {
                    popup.style.display = "flex"; 
                } else {
                    alert("Success! Message sent.");
                }
                contactForm.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please check your internet connection.");
        } finally {
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }
    });
}

function closePopup() {
    if (popup) {
        popup.style.display = "none";
    }
}