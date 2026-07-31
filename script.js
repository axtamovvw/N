// ==================================
// 1. LOADER & INITIALIZATION
// ==================================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 500);
    }, 800);
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
      errorMsg.innerText = '⚠️ Login yoki parol noto‘g‘ri!';
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
// 3. REAL TIME CLOCK
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
// 4. RANDOM LOVE NOTES LOGIC
// ==================================
const notes = [
  "Har bir kuning tabassum va quvonchga to‘la bo‘lsin! 🌸",
  "Sening borliging — dunyodagi eng go‘zal mo‘jizalardan biri. ✨",
  "Har doim o‘z orzularing sari ishonch bilan qadam tashla! 💖",
  "Yulduzlar qanchalik porlamasin, sening tabassuming baribir hammalaridan yorqinroq. 🌟",
  "Bugungi kuning kechagidan ham hayratarli va omadli o‘tsin! 🍀",
  "Sen o‘ylaganingdan ham kuchliroq va qobiliyatliroqsan! 💖"
];

function generateNote() {
  const noteText = document.getElementById("noteText");
  if (!noteText) return;

  noteText.style.opacity = "0";
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * notes.length);
    noteText.innerText = notes[randomIndex];
    noteText.style.opacity = "1";
  }, 300);
}

// ==================================
// 5. COUNTDOWN TIMER LOGIC
// ==================================
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