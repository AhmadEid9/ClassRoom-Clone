<?php
include('connection.php');

$classId = $_GET['class_id'];

// $stmt = $mysqli->prepare("SELECT class_name, classe_description, is_teacher,  .........
//                          FROM classes 
//                          JOIN user_classes ON classes.class_id = user_classes.class_id
//                          WHERE class_id = ?");
// $stmt->bind_param("i", $classId);
// $stmt->execute();
// $result = $stmt->get_result();

// $classes = array();
// while ($row = $result->fetch_assoc()) {
//     $classes[] = $row;
// }

// header('Content-Type: application/json');
// echo json_encode($classes);
// ?>
