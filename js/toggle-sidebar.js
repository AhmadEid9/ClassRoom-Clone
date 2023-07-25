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

document.addEventListener("DOMContentLoaded", function () {
  const plusIcon = document.querySelector(".plus-icon");
  const dropdown = document.getElementById("dropdown");

  plusIcon.addEventListener("click", function () {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
    dropdown.classList.toggle("show");
  });
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
