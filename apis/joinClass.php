<?php
include('connection.php');

$classname = $_POST['class_name'];
$email = $_POST['user_email'];

$check_email = $mysqli->prepare('SELECT user_id FROM users WHERE user_email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();


$check_class = $mysqli->prepare('SELECT class_name FROM classes WHERE class_name=?');
$check_class->bind_param('s', $classname);
$check_class->execute();
$check_class->store_result();
$class_exists = $check_class->num_rows();

if ($class_exists == 0 && $email_exists == 0) {
    $response['status'] = "failed";
    $response['message'] = "class already joined";
    } else {
    $get_class_id = $mysqli->prepare('SELECT class_id FROM classes WHERE class_name=?');
    $get_class_id->bind_param('s', $classname);
    $get_class_id->execute();
    $get_class_id->store_result();
    $class_ids = $get_class_id->fetch_assoc()['class_id'];
    $class_id = $class_ids['class_id'];

    $user_id = $check_email->fetch_assoc()['user_id'];

    $query = $mysqli->prepare('INSERT INTO user_classes(class_id, user_id) VALUES(?,?,?)');
    $query->bind_param('ii', $class_id, $user_id);
    $query->execute();

    $response['status'] = "success";
    $response['message'] = "Class Joined";
}

echo json_encode($response);

