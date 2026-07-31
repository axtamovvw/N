/* ==================================
       💖 N PROJECT EFFECTS CSS
================================== */

/* 💗 FLOATING HEARTS ANIMATION */
.heart {
  position: fixed;
  bottom: -50px;
  pointer-events: none;
  z-index: 20;
  animation: heartRise linear forwards;
}

@keyframes heartRise {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-115vh) scale(1.2);
    opacity: 0;
  }
}

/* 🌸 SAKURA FALL ANIMATION */
.leaf {
  position: fixed;
  top: -50px;
  pointer-events: none;
  z-index: 20;
  animation: sakuraFall linear forwards;
}

@keyframes sakuraFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(115vh) rotate(720deg);
    opacity: 0;
  }
}

/* ✨ MOUSE STAR STYLES */
.star {
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  box-shadow: 
    0 0 10px white, 
    0 0 20px var(--main-color), 
    0 0 35px var(--second-color);
  animation: starFade 0.8s ease-out forwards;
}

@keyframes starFade {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(0) translate(0, 15px);
    opacity: 0;
  }
}