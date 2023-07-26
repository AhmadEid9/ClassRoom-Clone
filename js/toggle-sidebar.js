const hamburgerIconCont = document.getElementById("hamburger-icon-cont");
const sliderOpen = document.querySelector(".slider-open");
const ProfileLink = document.getElementById("ProfileLink");
const Classes = document.getElementById("Classes");

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
ProfileLink.addEventListener("click", function () {
  window.location.href = "userProfile.html";
});
Classes.addEventListener("click", function () {
  window.location.href = "classes.html";
});

window.onload = function () {
  if (!localStorage.getItem("user_id")) {
    window.location.href = "landing.html";
  }
};
