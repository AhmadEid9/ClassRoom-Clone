<?php
include('connection.php');

$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];

$stmt = $mysqli->prepare("SELECT posts.post_title, posts.post_description, user_name
                         FROM posts, users, classes, user_classes
                         JOIN posts pts ON classes.class_id = pts.post_class
                         JOIN user_classes usrs ON usrs.user_id = posts.post_teacher
                         WHERE posts.post_class = ? AND users.user_id = ?");
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
