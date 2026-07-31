// ==================================
// 1. LOADER & INITIALIZATION
// ==================================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 600);
    }, 1000);
  }
  updateClock();
  updateCountdown();
});

// ==================================
// 2. LOGIN / LOGOUT LOGIC
// ==================================
function login() {
  const usernameInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const loginPage = document.getElementById('loginPage');
  const homePage = document.getElementById('homePage');

  if (usernameInput.toLowerCase() === 'n' && passwordInput === '1234') {
    loginPage.style.display = 'none';
    homePage.style.display = 'flex';
    if (errorMsg) errorMsg.innerText = '';
  } else {
    if (errorMsg) {
      errorMsg.innerText = '⚠️ Yagonam, login yoki parol noto‘g‘ri!';
    }
  }
}

function logout() {
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

// ==================================
// 3. REAL-TIME CLOCK
// ==================================
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.innerText = `${hours}:${minutes}:${seconds}`;

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateEl = document.getElementById('date');
  if (dateEl) dateEl.innerText = now.toLocaleDateString('uz-UZ', options);
}
setInterval(updateClock, 1000);

// ==================================
// 4. ROMANTIC LOVE NOTES
// ==================================
const notes = [
  "Sening tabassuming — mening har bir kunimning eng go'zal quyoshi... 🌸",
  "Dunyoda qancha yulduz bo'lsa ham, mening osmonimda faqat sen porlaysan. ✨",
  "Har bir urayotgan yurak urishim senga atalgan, yagonam... 💖",
  "Sen bilan o'tgan har bir soniya — hayotimning eng qadrli tuhfasi. 🌟",
  "Bugun ham, ertaga ham, har doim seni jonimdan ortiq sevaman... 🍀",
  "Sening borliging uchun Xudoga har kuni tashakkur aytaman. 💖",
  "Kuyib ketgudek sevaman seni, mening erkatoyim! ✨"
];

function generateNote() {
  const noteText = document.getElementById("noteText");
  if (!noteText) return;

  noteText.style.opacity = "0";
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * notes.length);
    noteText.innerText = notes[randomIndex];
    noteText.style.opacity = "1";
  }, 350);
}

// ==================================
// 5. COUNTDOWN TIMER LOGIC
// ==================================
// Maxsus kunizni shu yerga kiritishingiz mumkin: (Yil, Oy-1, Kun)
const targetDate = new Date(2026, 11, 31, 0, 0, 0).getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference < 0) return;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if (document.getElementById("days")) {
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
  }
}
setInterval(updateCountdown, 1000);