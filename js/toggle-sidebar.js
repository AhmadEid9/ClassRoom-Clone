const hamburgerIconCont = document.getElementById("hamburger-icon-cont");
const sliderOpen = document.querySelector(".slider-open");

hamburgerIconCont.addEventListener("click", () => {
  sliderOpen.classList.toggle("show-slider");
});

function isClickInsideSlider(event) {
  return (
    sliderOpen.contains(event.target) ||
    hamburgerIconCont.contains(event.target)
  );
}

window.addEventListener("click", (event) => {
  if (!isClickInsideSlider(event)) {
    sliderOpen.classList.remove("show-slider");
  }
});

function preventBack() {
  window.history.forward();
}
const signout = document.getElementById("signout");
signout.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "landing.html";
  setTimeout("preventBack()", 0);
  window.onunload = function () {
    null;
  };
});
