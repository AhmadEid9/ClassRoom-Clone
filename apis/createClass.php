<?php
include('connection.php');

$classname = $_POST['class_name'];
$classDescription = $_POST['class_description'];
$classLink = $_POST['class_link'];
$userId = $_POST['user_id'];

$check_link = $mysqli->prepare('SELECT class_name FROM classes WHERE class_link = ?');
$check_link->bind_param('s', $classLink);
$check_link->execute();
$check_link->store_result();
$link_exists = $check_link->num_rows();

if ($link_exists > 0) {
    $response['status'] = "failed";
    $response['message'] = "Class Link already exists";
} else {
    $check_class = $mysqli->prepare('SELECT c.class_name FROM classes c 
                                    INNER JOIN user_classes uc ON c.class_id = uc.class_id 
                                    WHERE c.class_name = ? AND uc.user_id = ?');
    $check_class->bind_param('si', $classname, $userId);
    $check_class->execute();
    $check_class->store_result();
    $class_exists = $check_class->num_rows();

    if ($class_exists == 0) {
        if (strlen($classname) == 0) {
            $response['status'] = "failed";
            $response['message'] = "Class Name Can't be empty";
        } else {
            $queryInsertClass = $mysqli->prepare('INSERT INTO classes (class_name, classe_description, class_link) VALUES (?, ?, ?)');
            $queryInsertClass->bind_param('sss', $classname, $classDescription, $classLink);
            $queryInsertClass->execute();

            $classId = $mysqli->insert_id;

            $queryInsertUserClass = $mysqli->prepare('INSERT INTO user_classes (user_id, class_id, is_teacher) VALUES (?, ?, 1)');
            $queryInsertUserClass->bind_param('ii', $userId, $classId);
            $queryInsertUserClass->execute();

            $response['status'] = "success";
            $response['message'] = "Class added";
        }
    } else {
        $response['status'] = "failed";
        $response['message'] = "Class already exists";
    }
}

echo json_encode($response);
