const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailInput = document.getElementById("Email");
const emailError = document.getElementById("emailError");
const passwordSection = document.getElementById("passwordSection");
const codeSection = document.getElementById("resetPassCode");
const emailSection = document.getElementById("emailsection");
const emailAlert = document.getElementById("emailAlert");
const resetPasswordSection = document.getElementById("resetPassword");
const backToEmail = document.getElementById("backToEmail");
const PasswordInput = document.getElementById("Password");
const passAlert = document.getElementById("passAlert");
var generatedCode = 0;
var fixedCode = 0;

backToEmail.addEventListener("click", function () {
  showEmailSection();
});
function showResetCodeSection() {
  passwordSection.style.display = "none";
  codeSection.style.display = "flex";
  emailCodeSpan = document.getElementById("email_code_span");
  emailCodeSpan.innerHTML = emailInput.value.trim();
}
function showResetPassSection() {
  codeSection.style.display = "none";
  resetPasswordSection.style.display = "flex";
}
function showPassSection() {
  if (!emailRegex.test(emailInput.value.trim())) {
    emailInput.style.border = "1px solid red";
    emailError.style.display = "block";
  } else {
    emailInput.style.border = "1px solid grey";
    emailError.style.display = "none";

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
  generatedCode = generateConfirmationCode();
  fixedCode = generatedCode;
  emailjs.init("r04vWJ2vgDHJ6-ava"); // Public key
  const emailParams = {
    message: generatedCode,
    to: emailInput.value.trim(),
  };

  const serviceId = "service_hx4h2o4";
  const templateId = "template_cd7o1sq";
  emailjs
    .send(serviceId, templateId, emailParams)
    .then((res) => {
      passwordSection.style.display = "none";
      codeSection.style.display = "flex";
      emailAlert.style.display = "block";
      setTimeout(function () {
        emailAlert.style.display = "none";
      }, 3000);
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

const continueBtn = document.getElementById("continueBtn");
let CodeInput = document.getElementById("CodeInput");
const wrongCodeError = document.getElementById("wrongCode");
continueBtn.addEventListener("click", function () {
  if (fixedCode !== parseInt(CodeInput.value)) {
    CodeInput.style.border = "1px solid red";
    wrongCodeError.style.display = "block";
  } else {
    CodeInput.value = "";
    showResetPassSection();
  }
});

const submitNewPass = document.getElementById("submitNewPass");
const newPassword = document.getElementById("newPassword");
submitNewPass.addEventListener("click", function () {
  if (newPassword.value === "") {
    newPassword.style.border = "1px solid red";
    return;
  } else {
    //todo fetch new pass to email    api
    passAlert.style.display = "block";
    setTimeout(function () {
      passAlert.style.display = "none";
    }, 3000);
    showEmailSection();
    newPassword.value = "";
  }
});

function showEmailSection() {
  emailSection.style.display = "block";
  passwordSection.style.display = "none";
  resetPasswordSection.style.display = "none";
}
let showPassResetCheckbox = document.getElementById("showPassReset");
showPassResetCheckbox.addEventListener("change", function () {
  const showPassword = showPassResetCheckbox.checked;
  newPassword.type = showPassword ? "text" : "password";
});
const passwordInput = document.getElementById("Password");
const submitBtn = document.getElementById("submit");

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

submitBtn.addEventListener("click", function () {
  let data = new FormData();
  data.append("user_password", passwordInput.value);
  data.append("user_email", emailInput.value);

  axios({
    method: "post",
    url: "http://localhost/ClassRoom-Clone/apis/signin.php",
    data: data,
  })
    .then((result) => {
      console.log(result);
      if (result.data.status == "logged in") {
        window.location.href = "classes.html";
      } else if (result.data.status == "user not found") {
        alert("user not found");
      } else {
        alert("wrong password");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
