const cancelCreateClass = document.getElementById("closeCreateClass");
const createClassBtn = document.getElementById("submitClass");
const createClassSection = document.getElementById("createClassModal");
let ClassNameInput = document.getElementById("ClassName");
let ClassTitleInput = document.getElementById("ClassTitle");
let ClassLinkInput = document.getElementById("ClassLink");
const meetLinkRegex = /^(https?:\/\/)?meet.google.com\/[a-z0-9\-]+$/i;
const meetLinkError = document.getElementById("meetLinkError");
const dropDownJoinCreate = document.getElementById("dropdown");
function showCreateClassModal() {
  createClassSection.style.display = "flex";
  dropDownJoinCreate.style.display = "none";
}

cancelCreateClass.addEventListener("click", function () {
  createClassSection.style.display = "none";
  ClassNameInput.value = "";
  ClassTitleInput.value = "";
  ClassLinkInput.value = "";
  ClassNameInput.style.borderBottom = "2px solid grey";
  ClassTitleInput.style.borderBottom = "2px solid grey";
  ClassLinkInput.style.borderBottom = "2px solid grey";
});

ClassLinkInput.addEventListener("input", function () {
  if (meetLinkRegex.test(ClassLinkInput.value.trim())) {
    ClassLinkInput.style.borderBottom = "2px solid green";
    meetLinkError.style.display = "none";
    createClassBtn.disabled = false;
  } else {
    ClassLinkInput.style.borderBottom = "2px solid red";
    meetLinkError.style.display = "block";
    createClassBtn.disabled = true;
  }
});

createClassBtn.addEventListener("click", function () {
  if (
    ClassNameInput.value === "" ||
    ClassTitleInput.value === "" ||
    ClassLinkInput.value === ""
  ) {
    if (ClassNameInput.value === "") {
      ClassNameInput.style.borderBottom = "2px solid red";
    } else {
      ClassNameInput.style.borderBottom = "2px solid grey";
    }
    if (ClassTitleInput.value === "") {
      ClassTitleInput.style.borderBottom = "2px solid red";
    } else {
      ClassTitleInput.style.borderBottom = "2px solid grey";
    }
    if (ClassLinkInput.value === "") {
      ClassLinkInput.style.borderBottom = "2px solid red";
    } else {
      ClassLinkInput.style.borderBottom = "2px solid grey";
    }
    return;
  } else {
    createClassSection.style.display = "none";
    // Todo: Call the create class API or perform further actions here
  }
});
ClassNameInput.addEventListener("input", function () {
  if (ClassNameInput.value === "") {
    ClassNameInput.style.borderBottom = "2px solid red";
  } else {
    ClassNameInput.style.borderBottom = "2px solid grey";
  }
});
ClassTitleInput.addEventListener("input", function () {
  if (ClassTitleInput.value === "") {
    ClassTitleInput.style.borderBottom = "2px solid red";
  } else {
    ClassTitleInput.style.borderBottom = "2px solid grey";
  }
});

const joinClassModal = document.getElementById("joinClassModal");
const cancelJoinBtn = document.getElementById("closeJoinClass");
const joinClassBtn = document.getElementById("submitJoin");
let classCodeInput = document.getElementById("ClassCode");
function showJoinClassModal() {
  joinClassModal.style.display = "flex";
  dropDownJoinCreate.style.display = "none";
  classCodeInput.value = "";
}
cancelJoinBtn.addEventListener("click", function () {
  joinClassModal.style.display = "none";
  classCodeInput.style.borderBottom = "2px solid grey";
  classCodeInput.value = "";
});
joinClassBtn.addEventListener("click", function () {
  if (classCodeInput.value === "") {
    classCodeInput.style.borderBottom = "2px solid red";
    return;
  } else {
    joinClassModal.style.display = "none";
    //TODO api check for class and if user exists in current class,, join class
  }
});
classCodeInput.addEventListener("input", function () {
  if (classCodeInput.value === "") {
    classCodeInput.style.borderBottom = "2px solid red";
  } else {
    classCodeInput.style.borderBottom = "2px solid grey";
  }
});

// create classes

function createNewClass() {
  const class_name = document.getElementById("ClassName").value;
  const class_description = document.getElementById("ClassTitle").value;
  const class_link = document.getElementById("ClassLink").value;

  const user_id = localStorage.getItem("user_id");

  let data = new FormData();
  data.append("class_name", class_name);
  data.append("class_description", class_description);
  data.append("class_link", class_link);
  data.append("user_id", user_id);
  console.log(data);
  axios({
    method: "post",
    url: "http://localhost/ClassRoom-Clone/apis/createClass.php",
    data: data,
  })
    .then((response) => {
      console.log(response.data);
      if (response.data.status === "success") {
        alert("Class added successfully!");
      } else if (
        response.data.status === "failed" &&
        response.data.message === "Class Link already exists"
      ) {
        alert("Class Link already exists. Please use a different link.");
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
document
  .getElementById("submitClass")
  .addEventListener("click", createNewClass);

// show classes

function fetchClassData() {
  const user_id = localStorage.getItem("user_id");

  axios
    .get(
      `http://localhost/ClassRoom-Clone/apis/showclasses.php?user_id=${user_id}`
    )
    .then((response) => {
      const classesData = response.data;
      const classCardsContainer = document.querySelector(".class-cards-cont");

      classesData.forEach((classData) => {
        const classCard = document.createElement("div");
        classCard.classList.add("card");

        classCard.innerHTML = `
          <div class="card-top">
            <div class="card-top-top">
              <img src="https://lh3.googleusercontent.com/a-/AOh14Gh-UFCjdhVNr0xUwyC8QYyyZAnO_D-depcTebpu=s75-c" alt="" class="absolute" />
              <a href="#" style="text-decoration: none; color: #fff">
                <div class="card-title"><h1>${classData.class_name}</h1></div>
              </a>
              <div class="card-title-classes"><h2>${classData.classe_description}</h2></div>
            </div>
            <div class="card-top-bottom">
            </div>
          </div>
          <div class="card-middle">
            <div class="card-middle-cont">
              <div class="date">
                <h4>Due Friday</h4>
              </div>
              <div class="hw-desc">
                <h5>11:00 PM -Charbel's Assignment</h5>
              </div>
            </div>
          </div>
          <div class="card-bottom">
            <div class="card-bottom-icon-cont">
              <a href="#" class="link">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#606368">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 5v14H5V5h14m0-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 10H6v-1.53c0-2.5 3.97-3.58 6-3.58s6 1.08 6 3.58V18zm-9.69-2h7.38c-.69-.56-2.38-1.12-3.69-1.12s-3.01.56-3.69 1.12z" />
                </svg>
              </a>
              <a href="#" class="link">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#606368">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>
              </a>
            </div>
          </div>
        `;

        classCardsContainer.appendChild(classCard);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
fetchClassData();
