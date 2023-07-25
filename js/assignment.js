const submitBtn = document.querySelector("#submitAssignment");

submitBtn.addEventListener("click", () => {
  const fileInputs = document.querySelectorAll('input[type="file"]');

  const files = [];
  fileInputs.forEach((fileInput) => files.push(fileInput.files[0]));

  const formData = new FormData();
  for (const [index, file] of files.entries()) {
    formData.append(`file${index}`, file); //appended files to form data
  }
  //upload form data with axios api, if success call showSubmittedFunction
});

function showSubmitted() {
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Submitted";
  submitBtn.style.backgroundColor = "grey";
  submitBtn.style.border = "none";
}
submitBtn.disabled = true;
submitBtn.innerHTML = "Submitted";
submitBtn.style.backgroundColor = "grey";
submitBtn.style.border = "none";

//.......................................constants that need get from assignments api
const assignmentDescription = document.getElementById("assignmentDescription");
const assignmentTitle = document.getElementById("assignmentTitle");
const teacherName = document.getElementById("teacherName");
const dueDate = document.getElementById("dueDate");
