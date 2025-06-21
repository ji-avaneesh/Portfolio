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

document.addEventListener("DOMContentLoaded", typeEffect);
