// ===============================
// 💗 FLOATING HEARTS
// ===============================
function createHeart() {
  let heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = ["💗", "💖", "💕", "❤️"][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 20) + "px";
  heart.style.animationDuration = (Math.random() * 4 + 4) + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}
setInterval(createHeart, 900);

// ===============================
// 🌸 SAKURA FALL
// ===============================
function createSakura() {
  let leaf = document.createElement("div");
  leaf.className = "leaf";
  leaf.innerHTML = ["🌸", "🌺", "🍃"][Math.floor(Math.random() * 3)];
  leaf.style.left = Math.random() * 100 + "vw";
  leaf.style.fontSize = (Math.random() * 15 + 20) + "px";
  leaf.style.animationDuration = (Math.random() * 5 + 5) + "s";
  document.body.appendChild(leaf);

  setTimeout(() => {
    leaf.remove();
  }, 12000);
}
setInterval(createSakura, 1200);

// ===============================
// ✨ MOUSE STAR TRAIL
// ===============================
document.addEventListener("mousemove", (e) => {
  let star = document.createElement("div");
  star.className = "star";
  star.style.left = e.pageX + "px";
  star.style.top = e.pageY + "px";
  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 800);
});

// ===============================
// 💫 RANDOM N SCALE ANIMATION
// ===============================
setInterval(() => {
  let n = document.querySelector(".letter");
  if (n) {
    n.style.transform = `scale(${1 + Math.random() / 15})`;
  }
}, 1000);