const submitBtn = document.querySelector("#submitAssignment");

submitBtn.addEventListener("click", () => {
  const fileInputs = document.querySelectorAll('input[type="file"]');

  const files = [];
  fileInputs.forEach((fileInput) => files.push(fileInput.files[0]));

  const formData = new FormData();
  for (const [index, file] of files.entries()) {
    formData.append(`file${index}`, file); //appended files to form data
  }
  //upload form data with axios api, if success call showSubmitted function below
});

function showSubmitted() {
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Submitted";
  submitBtn.style.backgroundColor = "grey";
  submitBtn.style.border = "none";
}

//.......................................constants that need get from assignments api
const assignmentDescription = document.getElementById("assignmentDescription");
const assignmentTitle = document.getElementById("assignmentTitle");
const teacherName = document.getElementById("teacherName");
const dueDate = document.getElementById("dueDate");

let assignment_class = localStorage.getItem("class_id");
let assignment_id = localStorage.getItem("assignment_id");

function fetchAssignmentDetails() {
  axios
    .get(
      `http://localhost/ClassRoom-Clone/apis/getAssignment.php?class_id=${assignment_class}&assignment_id=${assignment_id}`
    )
    .then((response) => {
      const assignment = response.data;
      console.log(assignment);
      assignmentTitle.textContent = assignment.assignment_title;
      assignmentDescription.textContent = assignment.assignment_description;
      teacherName.textContent = assignment.teacher_name;
      dueDate.textContent = assignment.assignment_due_date;
    })
    .catch((error) => {
      console.log(error);
    });
}
window.onload = fetchAssignmentDetails();
