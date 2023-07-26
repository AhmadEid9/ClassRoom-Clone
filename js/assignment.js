const submitBtn = document.querySelector("#submitAssignment");

function showSubmitted() {
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Submitted";
  submitBtn.style.backgroundColor = "grey";
  submitBtn.style.border = "none";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
//.......................................constants that need get from assignments api
const assignmentDescription = document.getElementById("assignmentDescription");
const assignmentTitle = document.getElementById("assignmentTitle");
const teacherName = document.getElementById("teacherName");
const dueDate = document.getElementById("dueDate");

let assignment_class = localStorage.getItem("class_id");
let assignment_id = localStorage.getItem("assign_id");
console.log(assignment_class);
console.log(assignment_id);
function fetchAssignmentDetails() {
  axios
    .get(
      `http://localhost/ClassRoom-Clone/apis/getAssignment.php?assignment_class=${assignment_class}&assignment_id=${assignment_id}`
    )
    .then((response) => {
      const assignment = response.data;
      console.log(assignment);
      assignmentTitle.textContent = assignment.assignment_title;
      assignmentDescription.textContent = assignment.assignment_description;
      teacherName.textContent = assignment.teacher_name;
      dueDate.textContent = formatDate(assignment.assignment_due_date);
    })
    .catch((error) => {
      console.log(error);
    });
}
window.onload = fetchAssignmentDetails();

function submitAssignment(formData) {
  axios
    .post(
      "http://localhost/ClassRoom-Clone/apis/submitAssignment.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response.data); // Assuming the server returns a response indicating success
      showSubmitted();
    })
    .catch((error) => {
      console.log(error);
    });
}
submitBtn.addEventListener("click", () => {
  const fileInputs = document.querySelectorAll('input[type="file"]');

  const files = [];
  fileInputs.forEach((fileInput) => files.push(fileInput.files[0]));

  const formData = new FormData();
  formData.append("class_id", localStorage.getItem("class_id"));
  formData.append("assignment_id", localStorage.getItem("assign_id"));
  for (const [index, file] of files.entries()) {
    formData.append(`attachment`, file);
  }
  submitAssignment(formData);
});
