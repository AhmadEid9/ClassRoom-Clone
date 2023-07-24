const class_title = document.getElementById("class-title");
const class_description = document.getElementById("class-description");
const assignments_box = document.getElementById("assingments");
const assignmentNameInput = document.getElementById("assignmentName");
const assignmentDescInput = document.getElementById("assignmentDesc");
const assignmentYearInput = document.getElementById("assingmentYear");
const assignmentMonthInput = document.getElementById("assingmentMonth");
const assignmentDayInput = document.getElementById("assingmentDay");
const assignmentTimeInput = document.getElementById("assignmentTime");
const createAssignmentButton = document.getElementById("submitAssignment");
const assignmentError = document.getElementById("assignmentError");
const createAssignmentSection = document.getElementById(
  "createAssignmentSection"
);

const closeCreateAssignment = document.getElementById("closeCreateAssignment");
const addAssignmentButton = document.getElementById("createAssignment");

createAssignmentButton.addEventListener("click", function () {
  if (
    assignmentDescInput.value === "" ||
    assignmentNameInput.value === "" ||
    assignmentYearInput.value === "" ||
    assignmentDayInput.value === "" ||
    assignmentMonthInput.value === "" ||
    assignmentTimeInput.value === ""
  ) {
    assignmentError.style.display = "block";
    setTimeout(function () {
      assignmentError.style.display = "none";
    }, 3000);
    return;
  } else {
    //todo create assignment api
  }
});

addAssignmentButton.addEventListener("click", function () {
  createAssignmentSection.style.display = "flex";
  assignmentDescInput.value = "";
  assignmentNameInput.value = "";
  assignmentYearInput.value = "";
  assignmentDayInput.value = "";
  assignmentMonthInput.value = "";
  assignmentTimeInput.value = "";
});
closeCreateAssignment.addEventListener("click", function () {
  createAssignmentSection.style.display = "none";
});

//.....................................
const closeAddFeed = document.getElementById("closeAddFeed");
const submitFeed = document.getElementById("submitFeed");

const FeedTitleInput = document.getElementById("feedTitle");
const FeedDescriptionInput = document.getElementById("FeedContent");
const FeedError = document.getElementById("FeedError");
const postNewFeedBtn = document.getElementById("postNewFeed");
const newFeedSection = document.getElementById("newFeedSection");

submitFeed.addEventListener("click", function () {
  if (FeedTitleInput.value === "" || FeedDescriptionInput.value === "") {
    FeedError.style.display = "block";
    setTimeout(function () {
      FeedError.style.display = "none";
    }, 3000);
    return;
  } else {
    //Todo api add new post
  }
});
postNewFeedBtn.addEventListener("click", function () {
  newFeedSection.style.display = "flex";
  FeedTitleInput.value = "";
  FeedDescriptionInput.value = "";
});
closeAddFeed.addEventListener("click", function () {
  newFeedSection.style.display = "none";
});

//.....................

const studentEmailInput = document.getElementById("studentEmail");

const submitAddStudentBtn = document.getElementById("submitAddStudent");
const closeAddStudentBtn = document.getElementById("closeAddStudent");
const addNewStudentSectionBtn = document.getElementById("addNewStudent");
const addNewStudentSection = document.getElementById("addNewStudentSection");
const emailError = document.getElementById("emailError");
const emailAlert = document.getElementById("emailAlert");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

studentEmailInput.addEventListener("input", function () {
  if (!emailRegex.test(studentEmailInput.value.trim())) {
    studentEmailInput.style.borderBottom = "2px solid red";
    emailError.style.display = "block";
    submitAddStudentBtn.disabled = ture;
  } else {
    emailError.style.display = "none";
    submitAddStudentBtn.disabled = false;
    studentEmailInput.style.borderBottom = "2px solid green";
  }
});

submitAddStudentBtn.addEventListener("click", function () {
  if (!emailRegex.test(studentEmailInput.value.trim())) {
    studentEmailInput.style.borderBottom = "2px solid red";
    emailError.style.display = "block";
    return;
  } else {
    sendMail();
    addNewStudentSection.style.display = "none";
  }
});

function sendMail() {
  emailjs.init("r04vWJ2vgDHJ6-ava"); // Public key
  const emailParams = {
    message: "https://meet.google.com/zox-wjgv-jer", //todo change to take value of class link from api
    to: studentEmailInput.value.trim(),
  };

  const serviceId = "service_hx4h2o4";
  const templateId = "template_lc12eb9";
  emailjs
    .send(serviceId, templateId, emailParams)
    .then((res) => {
      emailAlert.style.display = "block";
      setTimeout(function () {
        emailAlert.style.display = "none";
      }, 3000);
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
    });
}

addNewStudentSectionBtn.addEventListener("click", function () {
  studentEmailInput.value = "";
  addNewStudentSection.style.display = "flex";
});
closeAddStudentBtn.addEventListener("click", function () {
  addNewStudentSection.style.display = "none";
});

const streamBtn = document.getElementById("stream");
const peopleBtn = document.getElementById("people");
const stream_container = document.getElementById("stream_container");
const people_section = document.getElementById("people_section");

peopleBtn.addEventListener("click", function () {
  stream_container.style.display = "none";
  people_section.style.display = "flex";
  peopleBtn.classList.add("active");
  streamBtn.classList.remove("active");
  closeSubSections();
});
streamBtn.addEventListener("click", function () {
  stream_container.style.display = "flex";
  people_section.style.display = "none";
  peopleBtn.classList.remove("active");
  streamBtn.classList.add("active");
  closeSubSections();
});

function closeSubSections() {
  addNewStudentSection.style.display = "none";
  createAssignmentSection.style.display = "none";
  newFeedSection.style.display = "none";
}
