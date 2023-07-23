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
