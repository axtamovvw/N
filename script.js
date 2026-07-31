let currentGalleryIndex = 0;
let galleryCaptions = ["", "", ""];

// 1. INITIALIZATION & LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 600);
    }, 800);
  }
  updateClock();
  updateCountdown();
  loadSavedData();
});

// 2. DINAMIK RANGNI O'ZGARTIRISH
function changeThemeColor(colorHex) {
  document.documentElement.style.setProperty('--main-color', colorHex);
  localStorage.setItem('customThemeColor', colorHex);
}

// 3. LOGIN / LOGOUT LOGIC
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
      errorMsg.innerText = '⚠️ Ma'lumotlar noto‘g‘ri kiritildi!';
    }
  }
}

function logout() {
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

// 4. SOAT VA TAYMER
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

// 5. 24 SOATLIK DAILY NOTE (ESLATMA)
function saveDailyNote() {
  const noteVal = document.getElementById("dailyNoteInput").value;
  const noteData = {
    text: noteVal,
    timestamp: new Date().getTime()
  };
  localStorage.setItem("userDailyNote", JSON.stringify(noteData));
  
  const status = document.getElementById("noteStatus");
  status.innerText = "✓ Eslatma saqlandi (24 soat davomida saqlanadi)";
  setTimeout(() => status.innerText = "", 3000);
}

function checkDailyNote() {
  const saved = localStorage.getItem("userDailyNote");
  if (saved) {
    const parsed = JSON.parse(saved);
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (now - parsed.timestamp < twentyFourHours) {
      document.getElementById("dailyNoteInput").value = parsed.text;
    } else {
      localStorage.removeItem("userDailyNote");
      document.getElementById("dailyNoteInput").value = "";
    }
  }
}

// 6. PROFIL VA GALEREYA RASMLARINI YUKLASH
function triggerProfileUpload() {
  document.getElementById("profileUpload").click();
}

function loadProfileImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
    document.getElementById("profileImage").src = reader.result;
    localStorage.setItem("savedProfileImg", reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

let targetGalleryIndexToUpload = 0;
function triggerGalleryUpload(index) {
  targetGalleryIndexToUpload = index;
  document.getElementById("galleryUpload").click();
}

function loadGalleryImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
    document.getElementById(`galImg${targetGalleryIndexToUpload}`).src = reader.result;
    localStorage.setItem(`savedGalImg_${targetGalleryIndexToUpload}`, reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

// 7. LIGHTBOX (ASL HOLDA KO'RISH VA IZOH QO'SHISH)
function openLightbox(index) {
  currentGalleryIndex = index;
  const imgSrc = document.getElementById(`galImg${index}`).src;
  document.getElementById("lightboxImg").src = imgSrc;
  document.getElementById("lightboxCaptionInput").value = galleryCaptions[index] || "";
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox(e) {
  if (e.target.id === "lightbox") {
    document.getElementById("lightbox").style.display = "none";
  }
}

function closeLightboxDirect() {
  document.getElementById("lightbox").style.display = "none";
}

function saveCaption() {
  const val = document.getElementById("lightboxCaptionInput").value;
  galleryCaptions[currentGalleryIndex] = val;
  localStorage.setItem(`savedGalCaption_${currentGalleryIndex}`, val);
  alert("Izoh saqlandi!");
}

// 8. SAQLANGAN MA'LUMOTLARNI YUKLASH
function loadSavedData() {
  checkDailyNote();

  // Rang
  const savedColor = localStorage.getItem('customThemeColor');
  if (savedColor) changeThemeColor(savedColor);

  // Profil
  const savedProf = localStorage.getItem("savedProfileImg");
  if (savedProf) document.getElementById("profileImage").src = savedProf;

  // Galereya & Izohlar
  for (let i = 0; i < 3; i++) {
    const galImg = localStorage.getItem(`savedGalImg_${i}`);
    if (galImg) document.getElementById(`galImg${i}`).src = galImg;

    const cap = localStorage.getItem(`savedGalCaption_${i}`);
    if (cap) galleryCaptions[i] = cap;
  }
}