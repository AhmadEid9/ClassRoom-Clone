<?php
include('connection.php');

$class_id = $_GET['class_id'];

$stmt = $mysqli->prepare("SELECT user_name
                         FROM users 
                         where user_id =  
                         (Select user_id from user_classes 
                         where class_id = ? and is_teacher = 0)");
$stmt->bind_param("i", $class_id);
$stmt->execute();
$result = $stmt->get_result();

$students = array();
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

header('Content-Type: application/json');
echo json_encode($students);
?>
