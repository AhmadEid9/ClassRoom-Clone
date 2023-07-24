<?php
include('connection.php');

$userId = $_GET['user_id'];

$stmt = $mysqli->prepare("SELECT class_name, classe_description 
                         FROM classes 
                         JOIN user_classes ON classes.class_id = user_classes.class_id
                         WHERE user_id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$classes = array();
while ($row = $result->fetch_assoc()) {
    $classes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($classes);
?>
