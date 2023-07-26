<?php
include('connection.php');

$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];

$stmt = $mysqli->prepare("SELECT posts.*
                         FROM posts
                         WHERE posts.post_class = ? AND posts.post_teacher = ?;");
$stmt->bind_param("ii",$class_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

$classes = array();
while ($row = $result->fetch_assoc()) {
    $classes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($classes);
?>
