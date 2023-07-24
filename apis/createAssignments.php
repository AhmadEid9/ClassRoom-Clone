<?php
include('connection.php');

$assignment_title = $_POST['assignment_title'];
$assignment_description = $_POST['assignment_description'];
$assignment_teacher = $_POST['user_id'];
$assignement_due_date = $_POST['due_date'];
$class_id = $_POST['class_id'];

$check_assignment = $mysqli->prepare('SELECT assignment_title FROM assignments WHERE assignment_title=? AND assignment_class=?');
$check_assignment->bind_param('si', $assignment_title, $class_id);
$check_assignment->execute();
$check_assignment->store_result();
$assignment_exists = $check_assignment->num_rows();

if ($assignment_exists == 0) {
    if (strlen($assignment_title) == 0) {
        $response['status'] = "failed";
        $response['message'] = "Assignment Title Can't be empty";
    } else {
        $query = $mysqli->prepare('INSERT INTO assignments(assignment_title, assignment_description, assignment_class, assignment_teacher, assignment_due_date) VALUES(?,?,?,?,?)');
        $query->bind_param('ssiis', $assignment_title, $assignment_description, $class_id, $assignment_teacher, $assignement_due_date);
        $query->execute();

        $response['status'] = "success";
        $response['message'] = "Assignment added";
    }
} else {
    $response['status'] = "failed";
    $response['message'] = "Assignment already exists";
}

echo json_encode($response);
