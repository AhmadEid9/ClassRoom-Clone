<?php
include('connection.php');

$class_link = $_POST['class_link'];
$user_id = $_POST['user_id'];

$check_id = $mysqli->prepare('SELECT * FROM user_classes
                             JOIN classes ON user_classes.class_id = classes.class_id
                             WHERE class_link=? AND user_id=?');
$check_id->bind_param('si', $class_link, $user_id);
$check_id->execute();
$result = $check_id->get_result();

if ($result->num_rows > 0) {
    $response['status'] = "failed";
    $response['message'] = "Class already joined";
} else{
    $check_class= $mysqli->prepare('SELECT * FROM classes  WHERE class_link=? ');
    $check_class->bind_param('s', $class_link);
    $check_class->execute();
    $result2 = $check_class->get_result();
    if ($result2->num_rows == 0) {
        $response['status'] = "failed";
        $response['message'] = "Class doesn't exist";}
        
        else{
            $row = $result2->fetch_assoc();
            $class_id = $row['class_id'];
            $query = $mysqli->prepare('INSERT INTO user_classes(class_id, user_id) VALUES(?,?)');
            $query->bind_param('ii', $class_id, $user_id);
            $query->execute();
        
            $response['status'] = "success";
            $response['message'] = "Class Joined";
        }
    }    

echo json_encode($response);
