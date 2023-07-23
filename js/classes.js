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
