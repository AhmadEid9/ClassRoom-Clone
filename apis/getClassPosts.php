<?php
include('connection.php');

$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];

$stmt = $mysqli->prepare("SELECT posts.*
                         FROM posts, users, user_classes, classes
                         WHERE users.user_id = user_classes.user_id AND posts.post_class = classes.class_id AND posts.post_teacher = user_classes.user_id AND posts.post_class = ? AND users.user_id = ?;");
$stmt->bind_param("ii",$class_id, $userId);
$stmt->execute();
$result = $stmt->get_result();

$classes = array();
while ($row = $result->fetch_assoc()) {
    $classes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($classes);
?>
