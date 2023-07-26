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

const response_message = document.getElementById('response-message');
const message_modal = document.getElementById('message-modal')
const modal_close = document.getElementById('modal-close')


modal_close.addEventListener('click', hideResponseMessageModal)
let fixed_class_Id = localStorage.getItem("class_id");

const createAssignmentSection = document.getElementById(
  "createAssignmentSection"
);
const closeCreateAssignment = document.getElementById("closeCreateAssignment");
const addAssignmentButton = document.getElementById("createAssignment");
let dueDate = "";
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
    dueDate =
      assignmentYearInput.value +
      "-" +
      assignmentMonthInput.value +
      "-" +
      assignmentDayInput.value +
      " " +
      assignmentTimeInput.value +
      ":00";
    createAssignment();
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
    createPost();
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
  let class_code= localStorage.getItem('class_code')
  console.log(`hi ${class_code}`);

  const emailParams = {
    message: class_code, //check
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

// show-details
function fetchClassDetails() {
  let class_id = localStorage.getItem("class_id");
  let user_id = localStorage.getItem("user_id");

  const formData = new FormData();
  formData.append("class_id", class_id);
  formData.append("user_id", user_id);

  axios
    .post("http://localhost/ClassRoom-Clone/apis/classDetails.php", formData)
    .then((response) => {
      const classDetails = response.data;
      // const classDetailsContainer = document.getElementById('classDetailsContainer');
      // classDetailsContainer.innerHTML = '';
      let class_title = document.getElementById("class-title");
      let class_desc = document.getElementById("class-description");
      let link_box = document.getElementById("link");

      classDetails.forEach((classDetail) => {
        class_title.textContent = classDetail.class_name;
        class_desc.textContent = classDetail.classe_description;
        link_box.textContent = classDetail.class_link;
   
        localStorage.setItem('class_code', classDetail.class_link)
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  fetchClassDetails();
});

//...............................................

function createAssignment() {
  const class_id = localStorage.getItem("class_id");
  const user_id = localStorage.getItem("user_id");

  let data = new FormData();
  data.append("class_id", class_id);
  data.append("user_id", user_id);
  data.append("assignment_title", assignmentNameInput.value);
  data.append("assignment_description", assignmentDescInput.value);
  data.append("due_date", dueDate);
  axios({
    method: "post",
    url: "http://localhost/ClassRoom-Clone/apis/createAssignments.php",
    data: data,
  })
    .then((response) => {
      console.log(response.data);
     showResponseMessageModal(response.data.message)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function createPost() {
  const class_id = localStorage.getItem("class_id");
  const user_id = localStorage.getItem("user_id");

  let data = new FormData();
  data.append("class_id", class_id);
  data.append("user_id", user_id);
  data.append("post_title", FeedTitleInput.value);
  data.append("post_description", FeedDescriptionInput.value);
  axios({
    method: "post",
    url: "http://localhost/ClassRoom-Clone/apis/createPosts.php",
    data: data,
  })
    .then((response) => {
      showResponseMessageModal(response.data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const studentNameContainer = document.getElementById("studentContainer");
const teacherNameContainer = document.getElementById("teacherContainer");

function getClassStudents() {
  axios
    .get(
      `http://localhost/ClassRoom-Clone/apis/getClassStudents.php?class_id=${fixed_class_Id}`
    )
    .then((response) => {
      const students = response.data;
      students.forEach((student) => {
        studentNameContainer.innerHTML = `<p>${students.user_name}</p>`;
      });
    });
}
function getClassTeachers() {
  axios
    .get(
      `http://localhost/ClassRoom-Clone/apis/getClassTeachers.php?class_id=${fixed_class_Id}`
    )
    .then((response) => {
      const teachers = response.data;
      teachers.forEach((teacher) => {
        teacherNameContainer.innerHTML = `<p>${teacher.user_name}</p>`;
      });
    });
}
const meeting_link = document.getElementById("meeting-link");
meeting_link.addEventListener("click", function () {
  window.open(class_code, "_blank");
});

window.onload = getClassTeachers();
window.onload = getClassStudents();

function showResponseMessageModal(message) {
  message_modal.style.display = "flex";
  response_message.innerText = message
}

function hideResponseMessageModal() {
  message_modal.style.display = "none";
}