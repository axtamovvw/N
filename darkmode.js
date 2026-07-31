function darkMode() {
  document.body.classList.toggle("dark");
  const darkBtn = document.querySelector(".dark-btn");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    if (darkBtn) darkBtn.innerText = "☀️ Kunduzi rejim";
  } else {
    localStorage.setItem("theme", "light");
    if (darkBtn) darkBtn.innerText = "🌙 Tungi rejim";
  }
}

window.addEventListener("load", () => {
  let theme = localStorage.getItem("theme");
  const darkBtn = document.querySelector(".dark-btn");

  if (theme === "dark") {
    document.body.classList.add("dark");
    if (darkBtn) darkBtn.innerText = "☀️ Kunduzi rejim";
  }
});