<?php
include('connection.php');

$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];

$check_id = $mysqli->prepare('SELECT user_id FROM users WHERE user_id=?');
$check_id->bind_param('i', $id);
$check_id->execute();
$check_id->store_result();
$id_exists = $check_id->num_rows();


$check_class = $mysqli->prepare('SELECT class_id FROM classes WHERE class_id=?');
$check_class->bind_param('s', $class_id);
$check_class->execute();
$check_class->store_result();
$class_exists = $check_class->num_rows();

if ($class_exists == 0 && $email_exists == 0) {
    $response['status'] = "failed";
    $response['message'] = "class already joined";
    } else {
        
    $query = $mysqli->prepare('INSERT INTO user_classes(class_id, user_id) VALUES(?,?,?)');
    $query->bind_param('ii', $class_id, $user_id);
    $query->execute();

    $response['status'] = "success";
    $response['message'] = "Class Joined";
}

echo json_encode($response);

