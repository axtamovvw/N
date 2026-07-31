/* ==================================
       🌙 DARK MODE STYLES
================================== */

/* Dark mode yoqilganda body foni */
body.dark {
  background: linear-gradient(135deg, #0f0c20, #1a102f, #05020a) !important;
  background-size: 400% 400%;
  --main-color: #d81b60;
  --second-color: #8e24aa;
  --shadow-color: rgba(216, 27, 96, 0.4);
}

/* Glass elementlarning dark mode holati */
body.dark .glass,
body.dark .login-box,
body.dark .profile-card,
body.dark .clock-box,
body.dark .color-box,
body.dark .popup-box {
  background: rgba(15, 12, 32, 0.55) !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.8) !important;
}

/* Inputlarni quyuqroq qilish */
body.dark input[type="text"],
body.dark input[type="password"] {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
}

body.dark input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

/* Dark mode tugmasining ko'rinishini moslash */
body.dark .dark-btn {
  background: linear-gradient(90deg, #8e24aa, #d81b60) !important;
}