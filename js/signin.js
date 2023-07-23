const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailInput = document.getElementById("Email");
const emailError = document.getElementById("emailError");
const passwordInput = document.getElementById("Password");
const submitBtn= document.getElementById("submit");

function showPassSection() {
  if (!emailRegex.test(emailInput.value.trim())) {
    emailInput.style.border = "1px solid red";
    emailError.style.display = "block";
  } else {
    emailInput.style.border = "1px solid grey";
    emailError.style.display = "none";

    const passwordSection = document.getElementById("passwordSection");
    const emailSection = document.getElementById("emailsection");
    passwordSection.style.display = "flex";
    emailSection.style.display = "none";
  }
}

window.addEventListener("load", function () {
  emailInput.addEventListener("input", function () {
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.style.border = "1px solid red";
      emailError.style.display = "block";
    } else {
      emailInput.style.border = "1px solid grey";
      emailError.style.display = "none";
    }
  });
});

function generateConfirmationCode() {
  const min = 10001;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendMail() {
  emailjs.init("r04vWJ2vgDHJ6-ava"); // Public key
  const emailParams = {
    message: generateConfirmationCode(),
    to: emailInput.value.trim(),
  };
  const serviceId = "service_hx4h2o4";
  const templateId = "template_cd7o1sq";
  emailjs
    .send(serviceId, templateId, emailParams)
    .then((res) => {
      alert("Email sent");
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
    });
}

const forgotPass = document.getElementById("forgot_pass");
forgotPass.addEventListener("click", sendMail);
window.addEventListener("beforeunload", function (event) {
  event.returnValue =
    "Are you sure you want to leave? You have unsaved changes.";
});

submitBtn.addEventListener("click", function () {
  let data = new FormData();
  data.append('user_password', passwordInput.value);
  data.append('user_email', emailInput.value);
  
  axios({
      "method": "post",
      "url": "http://localhost/ClassRoom-Clone/apis/signin.php",
      "data": data
  }).then((result) => {
      console.log(result)
      if (result.data.status == "logged in") {
        window.location.href = 'classes.html';   
    } else if (result.data.status == "user not found") {
        alert("user not found");
    } else {
        alert("wrong password");
    }
      
  }).catch((err) => {
      console.error(err)
  });
})