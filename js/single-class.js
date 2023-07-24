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
