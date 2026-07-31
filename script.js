let galleryItems = []; 
let activeGalleryId = null;

// 5 TA MUSIQA FAYLLARI RO'YXATI (music/ papkasi ichida)
const localTracks = [
  "music/track1.mp3",
  "music/track2.mp3",
  "music/track3.mp3",
  "music/track4.mp3",
  "music/track5.mp3"
];

// 1. INITIALIZATION & LOADER
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader && loader.style.display !== "none") {
    loader.style.opacity = "0";
    setTimeout(() => { loader.style.display = "none"; }, 500);
  }
}
setTimeout(hideLoader, 1000);

window.addEventListener("DOMContentLoaded", () => {
  hideLoader();
  try { updateClock(); } catch(e) {}
  try { updateCountdown(); } catch(e) {}
  try { loadSavedData(); } catch(e) {}
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

  if (usernameInput.toLowerCase() === 'n' && passwordInput === '1234') {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('homePage').style.display = 'flex';
    if (errorMsg) errorMsg.innerText = '';
  } else {
    if (errorMsg) errorMsg.innerText = '⚠️ Ma\'lumotlar noto‘g‘ri kiritildi!';
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

// 5. 24 SOATLIK DAILY NOTE
function saveDailyNote() {
  const noteVal = document.getElementById("dailyNoteInput").value;
  const noteData = { text: noteVal, timestamp: new Date().getTime() };
  localStorage.setItem("userDailyNote", JSON.stringify(noteData));
  
  const status = document.getElementById("noteStatus");
  if(status) {
    status.innerText = "✓ Eslatma saqlandi (24 soat davomida saqlanadi)";
    setTimeout(() => status.innerText = "", 3000);
  }
}

function checkDailyNote() {
  const saved = localStorage.getItem("userDailyNote");
  if (saved) {
    const parsed = JSON.parse(saved);
    const now = new Date().getTime();
    if (now - parsed.timestamp < 24 * 60 * 60 * 1000) {
      const noteInput = document.getElementById("dailyNoteInput");
      if(noteInput) noteInput.value = parsed.text;
    } else {
      localStorage.removeItem("userDailyNote");
    }
  }
}

// 6. PROFIL RASMI VA O'CHIRISH
function triggerProfileUpload() {
  document.getElementById("profileUpload").click();
}

function loadProfileImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
    const imgEl = document.getElementById("profileImage");
    const placeholder = document.getElementById("profilePlaceholder");
    const removeBtn = document.getElementById("profileRemoveBtn");

    imgEl.src = reader.result;
    imgEl.style.display = "block";
    placeholder.style.display = "none";
    removeBtn.style.display = "block";

    localStorage.setItem("savedProfileImg", reader.result);
  };
  if(event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
}

function removeProfileImage() {
  const imgEl = document.getElementById("profileImage");
  const placeholder = document.getElementById("profilePlaceholder");
  const removeBtn = document.getElementById("profileRemoveBtn");

  imgEl.src = "";
  imgEl.style.display = "none";
  placeholder.style.display = "block";
  removeBtn.style.display = "none";

  localStorage.removeItem("savedProfileImg");
}

// 7. CHEKSIZ GALEREYA VA O'CHIRISH
function triggerGalleryUpload() {
  document.getElementById("galleryUpload").click();
}

function loadGalleryImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function() {
    const newItem = {
      id: Date.now(),
      src: reader.result,
      caption: ""
    };
    galleryItems.push(newItem);
    saveGalleryToStorage();
    renderGallery();
  };
  reader.readAsDataURL(file);
}

function renderGallery() {
  const container = document.getElementById("galleryContainer");
  container.innerHTML = "";

  galleryItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "img-card";
    card.onclick = () => openLightbox(item.id);

    card.innerHTML = `
      <img src="${item.src}" alt="Gallery Image">
      <span class="delete-badge" onclick="event.stopPropagation(); removeGalleryImage(${item.id})">🗑️ O'chirish</span>
    `;
    container.appendChild(card);
  });
}

function removeGalleryImage(id) {
  galleryItems = galleryItems.filter(item => item.id !== id);
  saveGalleryToStorage();
  renderGallery();
}

function saveGalleryToStorage() {
  localStorage.setItem("savedGalleryItems", JSON.stringify(galleryItems));
}

// 8. LIGHTBOX
function openLightbox(id) {
  activeGalleryId = id;
  const item = galleryItems.find(i => i.id === id);
  if(item) {
    document.getElementById("lightboxImg").src = item.src;
    document.getElementById("lightboxCaptionInput").value = item.caption || "";
    document.getElementById("lightbox").style.display = "flex";
  }
}

function closeLightbox(e) {
  if (e.target.id === "lightbox") document.getElementById("lightbox").style.display = "none";
}

function closeLightboxDirect() {
  document.getElementById("lightbox").style.display = "none";
}

function saveCaption() {
  const val = document.getElementById("lightboxCaptionInput").value;
  const item = galleryItems.find(i => i.id === activeGalleryId);
  if(item) {
    item.caption = val;
    saveGalleryToStorage();
    alert("Izoh saqlandi!");
  }
}

// 9. 5 TA MUSIQA IJRO ETISH LOGIKASI
function playTrack(index, btnElement) {
  const player = document.getElementById("bgMusic");

  if (localTracks[index]) {
    player.src = localTracks[index];
    player.play();

    document.querySelectorAll(".track-btn").forEach(btn => btn.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
  }
}

// 10. SAQLANGAN MA'LUMOTLARNI YUKLASH
function loadSavedData() {
  checkDailyNote();

  const savedColor = localStorage.getItem('customThemeColor');
  if (savedColor) changeThemeColor(savedColor);

  // Profil
  const savedProf = localStorage.getItem("savedProfileImg");
  if (savedProf) {
    const imgEl = document.getElementById("profileImage");
    const placeholder = document.getElementById("profilePlaceholder");
    const removeBtn = document.getElementById("profileRemoveBtn");

    imgEl.src = savedProf;
    imgEl.style.display = "block";
    placeholder.style.display = "none";
    removeBtn.style.display = "block";
  }

  // Galereya
  const savedGal = localStorage.getItem("savedGalleryItems");
  if (savedGal) {
    galleryItems = JSON.parse(savedGal);
    renderGallery();
  }
}