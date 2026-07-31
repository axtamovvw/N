// FLOATING HEARTS
function createHeart() {
  let heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = ["✨", "💖", "🌸", "💕"][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 15 + 18) + "px";
  heart.style.animationDuration = (Math.random() * 4 + 5) + "s";
  document.body.appendChild(heart);

  setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 900);

// SAKURA FALL
function createSakura() {
  let leaf = document.createElement("div");
  leaf.className = "leaf";
  leaf.innerHTML = ["🌸", "🌺"][Math.floor(Math.random() * 2)];
  leaf.style.left = Math.random() * 100 + "vw";
  leaf.style.fontSize = (Math.random() * 12 + 18) + "px";
  leaf.style.animationDuration = (Math.random() * 5 + 6) + "s";
  document.body.appendChild(leaf);

  setTimeout(() => { leaf.remove(); }, 11000);
}
setInterval(createSakura, 1200);