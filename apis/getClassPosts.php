<?php
include('connection.php');

$class_id = $_GET['class_id'];

$stmt = $mysqli->prepare("SELECT DISTINCT p.post_id, p.post_title, p.post_description, u.user_name 
                            FROM posts p
                            JOIN user_classes uc ON p.post_teacher = uc.user_id
                            JOIN users u ON uc.user_id = u.user_id
                            WHERE p.post_class = ?;");
$stmt->bind_param("i",$class_id);
$stmt->execute();
$result = $stmt->get_result();

$classes = array();
while ($row = $result->fetch_assoc()) {
    $classes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($classes);
?>
