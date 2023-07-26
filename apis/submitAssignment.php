<?php
include('connection.php');

$assignment_id = $_POST['assignment_id'];
$user_id = $_POST['user_id'];
$attachment = $_POST['attachment'];

$check_assignment = $mysqli->prepare('SELECT submition_id FROM user_assignments WHERE assignment_id=? AND user_id=?');
$check_assignment->bind_param('si', $assignment_id, $user_id);
$check_assignment->execute();
$check_assignment->store_result();
$assignment_exists = $check_assignment->num_rows();

if ($assignment_exists == 0) {
    $query = $mysqli->prepare('INSERT INTO user_assignments(assignment_id, user_id, attachmen) VALUES(?,?,?);');
    $query->bind_param('iis', $assignment_id, $user_id, $attachment);
    $query->execute();

    $response['status'] = "success";
    $response['message'] = "Assignment submited";
} else {
    $response['status'] = "failed";
    $response['message'] = "Assignment already submited before";
}

echo json_encode($response);
