/* ==================================
       💖 N PROJECT SCRIPT JS
================================== */

// DOM elementlarini bir marta ushlab olamiz
const loader = document.getElementById('loader');
const loginPage = document.getElementById('loginPage');
const homePage = document.getElementById('homePage');
const errorMsg = document.getElementById('error');

// 1. SAHIFA YUKLANISHI (LOADING EFFECT)
window.addEventListener('load', () => {
  setTimeout(() => {
    if (loader) loader.style.display = 'none';
  }, 1500); // 1.5 soniyadan so'ng loader yo'qoladi
});

// 2. LOGIN / LOGOUT FUNKSIYALARI
function login() {
  const usernameInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  // Login uchun namuna (xohlasangiz o'zgartirishingiz mumkin)
  if (usernameInput.toLowerCase() === 'n' && passwordInput === '1234') {
    loginPage.style.display = 'none';
    homePage.style.display = 'flex';
    if (errorMsg) errorMsg.innerText = '';
  } else {
    if (errorMsg) {
      errorMsg.style.color = '#fff';
      errorMsg.style.marginTop = '10px';
      errorMsg.innerText = '⚠️ Login yoki parol noto‘g‘ri!';
    }
  }
}

function logout() {
  homePage.style.display = 'none';
  loginPage.style.display = 'flex';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

// 3. SOAT VA SANA (REAL-TIME CLOCK)
function updateClock() {
  const now = new Date();
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const clockElem = document.getElementById('clock');
  const dateElem = document.getElementById('date');
  
  if (clockElem) clockElem.innerText = `${hours}:${minutes}:${seconds}`;
  
  if (dateElem) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateElem.innerText = now.toLocaleDateString('uz-UZ', options);
  }
}
setInterval(updateClock, 1000);
updateClock();

// 4. GALEREYA VA RASM YUKLASH (IMAGE UPLOAD & VIEWER)
const imageInput = document.getElementById('imageInput');
const gallery = document.getElementById('gallery');
const imageViewer = document.getElementById('imageViewer');
const bigImage = document.getElementById('bigImage');

if (imageInput) {
  imageInput.addEventListener('change', function (e) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.onclick = () => openImage(event.target.result);
        if (gallery) gallery.appendChild(img);
      };
      reader.readAsDataURL(files[i]);
    }
  });
}

function openImage(src) {
  if (imageViewer && bigImage) {
    bigImage.src = src;
    imageViewer.style.display = 'flex';
  }
}

function closeImage() {
  if (imageViewer) imageViewer.style.display = 'none';
}

// 5. MAXFIY XABAR (POPUP MESSAGE)
function showMessage() {
  const popup = document.getElementById('popup');
  if (popup) popup.style.display = 'flex';
}

function closePopup() {
  const popup = document.getElementById('popup');
  if (popup) popup.style.display = 'none';
}

// 6. SEHRLI TILAKLAR (MAGIC WISH)
const wishes = [
  "Har doim tabassum qilib yur! 😊",
  "Bugungi kuning ajoyib o'tsin! 🌸",
  "Sen juda ham ajoyib insonsan! 💖",
  "Barcha orzularing ushalsin! ✨",
  "O'zingga bo'lgan ishonching hech qachon so'nmasin! 🌟",
  "Har bir kun senga quvonch olib kelsin! 🎈"
];

function makeWish() {
  const wishBox = document.getElementById('wishBox');
  if (wishBox) {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    wishBox.innerText = randomWish;
    wishBox.classList.add('show');
    
    setTimeout(() => {
      wishBox.classList.remove('show');
    }, 4000); // 4 soniyadan so'ng yopiladi
  }
}

// 7. MUSIQA VA OVOZ BO'YICHA BOSHQARUV (MUSIC CONTROL)
const music = document.getElementById('music');
const volumeSlider = document.getElementById('volume');

function toggleMusic() {
  if (music) {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  }
}

if (volumeSlider && music) {
  volumeSlider.addEventListener('input', (e) => {
    music.volume = e.target.value;
  });
}

// 8. TEMATIK RANG TANLASH (COLOR PICKER)
function changeColor(color) {
  document.documentElement.style.setProperty('--main-color', color);
  
  // Asosiy va ikkinchi darajali ranglarni avtomatik uyg'unlashtirish
  if (color === '#3498db') {
    document.documentElement.style.setProperty('--second-color', '#2980b9');
    document.documentElement.style.setProperty('--shadow-color', 'rgba(52, 152, 219, 0.45)');
  } else if (color === '#9b59b6') {
    document.documentElement.style.setProperty('--second-color', '#8e44ad');
    document.documentElement.style.setProperty('--shadow-color', 'rgba(155, 89, 182, 0.45)');
  } else if (color === '#2ecc71') {
    document.documentElement.style.setProperty('--second-color', '#27ae60');
    document.documentElement.style.setProperty('--shadow-color', 'rgba(46, 204, 113, 0.45)');
  } else if (color === '#f1c40f') {
    document.documentElement.style.setProperty('--second-color', '#f39c12');
    document.documentElement.style.setProperty('--shadow-color', 'rgba(241, 196, 15, 0.45)');
  } else {
    document.documentElement.style.setProperty('--second-color', '#ff1493');
    document.documentElement.style.setProperty('--shadow-color', 'rgba(255, 20, 147, 0.45)');
  }
}

// 9. DARK MODE TOGGLE
let isDark = false;
function darkMode() {
  isDark = !isDark;
  if (isDark) {
    document.body.style.background = 'linear-gradient(135deg, #121212, #2c3e50, #000)';
    document.documentElement.style.setProperty('--main-color', '#ff1493');
  } else {
    document.body.style.background = 'linear-gradient(135deg, var(--main-color), var(--light-color), #fff)';
    document.body.style.backgroundSize = '400% 400%';
  }
}