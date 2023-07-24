<?php
include('connection.php');

$classname = $_POST['class_name'];
$classDescription = $_POST['class_description'];
$classLink = $_POST['class_link'];

$check_class = $mysqli->prepare('SELECT class_name FROM classes WHERE class_name=?');
$check_class->bind_param('s', $classname);
$check_class->execute();
$check_class->store_result();
$class_exists = $check_class->num_rows();

if ($class_exists == 0) {
    if (strlen($classname) == 0) {
        $response['status'] = "failed";
        $response['message'] = "Class Name Can't be empty";
    } else {
        $query = $mysqli->prepare('INSERT INTO classes(class_name, classe_description, class_link) VALUES(?,?,?)');
        $query->bind_param('sss', $classname, $classDescription, $classLink);
        $query->execute();

        $response['status'] = "success";
        $response['message'] = "Class added";
    }
} else {
    $response['status'] = "failed";
    $response['message'] = "class already exists";
}

echo json_encode($response);

