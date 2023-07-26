const nameView = document.getElementById("username");
const emailView = document.getElementById("email");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const cancelEdit = document.getElementById("cancelEdit");
const saveProfile = document.getElementById("saveProfile");
const editProfile = document.getElementById("editProfle");
const editProfleSection = document.getElementById("editProfleSection");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let user_id = localStorage.getItem("user_id");

function fetchUserData() {
  axios
    .get(
      `http://localhost/ClassRoom-Clone/apis/getUserProfile.php?user_id=${user_id}`
    )
    .then((response) => {
      const user = response.data;
      nameView.innerHTML = user.user_name;
      emailView.innerHTML = user.user_email;
      nameInput.value = user.user_name;
      emailInput.value = user.user_email;
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUserInfo() {
  const updatedName = nameInput.value;
  const updatedEmail = emailInput.value;

  const formData = new FormData();
  formData.append("user_name", updatedName);
  formData.append("user_email", updatedEmail);

  axios
    .post(
      `http://localhost/ClassRoom-Clone/apis/updateUserInfo.php?user_id=${user_id}`,
      formData
    )
    .then((response) => {
      if (response.data.success) {
        nameView.innerHTML = updatedName;
        emailView.innerHTML = updatedEmail;

        editProfleSection.style.display = "none";
        successfulSave.style.display = "block";
        setTimeout(function () {
          successfulSave.style.display = "none";
        }, 3000);
        console.log(response.data.message);
      }
      if ((response.message = "No changes made to the user information.")) {
        noChange.style.display = "block";
        setTimeout(function () {
          noChange.style.display = "none";
        }, 3000);
        console.log(response.data.message);
        editProfleSection.style.display = "none";
      } else {
        failedSave.style.display = "block";
        setTimeout(function () {
          failedSave.style.display = "none";
        }, 3000);
        emailInput.style.borderBottom = "2px solid red";
        emailInput.focus();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

window.onload = fetchUserData();

saveProfile.addEventListener("click", function () {
  if (nameInput.value === "" || emailInput.value === "") {
    if (nameInput.value === "") {
      nameInput.style.borderBottom = "2px solid red";
    } else {
      nameInput.style.borderBottom = "2px solid grey";
    }
    if (emailInput.value === "") {
      emailInput.style.borderBottom = "2px solid red";
    } else {
      emailInput.style.borderBottom = "2px solid grey";
    }
    return;
  } else {
    updateUserInfo();
  }
});

cancelEdit.addEventListener("click", function () {
  editProfleSection.style.display = "none";
  emailInput.value = emailView.textContent;
  nameInput.value = nameView.textContent;
});

editProfile.addEventListener("click", function () {
  editProfleSection.style.display = "flex";
});

emailInput.addEventListener("input", function () {
  if (!emailRegex.test(emailInput.value.trim())) {
    emailInput.style.borderBottom = "2px solid red";
    saveProfile.disabled = true;
  } else {
    emailInput.style.borderBottom = "2px solid grey";
    saveProfile.disabled = false;
  }
});
const successfulSave = document.getElementById("successfulSave");
const failedSave = document.getElementById("failedSave");
const noChange = document.getElementById("noChange");
