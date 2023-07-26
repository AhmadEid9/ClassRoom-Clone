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

const stream = document.getElementById('streams')

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
window.onload = getClassPosts();

function showResponseMessageModal(message) {
  message_modal.style.display = "flex";
  response_message.innerText = message
}

function hideResponseMessageModal() {
  message_modal.style.display = "none";
}

async function getClassPosts() {
  axios
    .get(
      `http://localhost/ClassRoom-Clone/apis/getClassPosts.php?class_id=${fixed_class_Id}&user_id=${localStorage.getItem("user_id")}`
    )
    .then((response) => {
      const posts = response.data;
      posts.forEach((post) => {
        addPostToStream(post);
      });
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
    });
}

function addPostToStream(post){
  const post_title = post['post_title']
  const post_description = post['post_description']
  let element = `<div class="headlines">
  <div class="new-assignment" id="newAssignment">
    <h2>Add New Assignment</h2>
    <button type="button" id="createAssignment">
      Add Assignment
    </button>
  </div>
  <div class="headline" id="postNewFeed">
    <p>Share with your class new feed ...</p>
  </div>
  <a href="">
    <div class="headline">
      <div class="board">
        <svg
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="NMm5M hhikbc"
          style="fill: white"
        >
          <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
          <path
            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0
            .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0
            .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"
          ></path>
        </svg>
      </div>

      <label id="postLabel"> ${post_title}: ${post_description}</label>
    </div></a>`
    stream.innerHTML += element;
}