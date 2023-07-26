<?php
include('connection.php');

$class_id = $_GET['class_id'];
$user_id = $_GET['user_id'];

$stmt = $mysqli->prepare("SELECT DISTINCT uc.is_teacher
                            FROM user_classes uc
                            WHERE uc.class_id = ? AND uc.user_id = ?;");
$stmt->bind_param("ii", $class_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

$teachers = array();
while ($row = $result->fetch_assoc()) {
    $teachers[] = $row;
}

header('Content-Type: application/json');
echo json_encode($teachers);
?>
