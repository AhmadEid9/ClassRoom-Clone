<?php
include('connection.php');

$classId = $_GET['class_id'];

$stmt = $mysqli->prepare("SELECT Distinct a.assignment_id, a.assignment_title, a.assignment_description, a.assignment_due_date, u.user_name 
                         FROM assignments a
                         JOIN user_classes uc ON a.assignment_teacher = uc.user_id
                         JOIN users u ON uc.user_id = u.user_id
                         WHERE a.assignment_class = ?");

$stmt->bind_param("i", $classId);
$stmt->execute();
$result = $stmt->get_result();

$assign = array();
while ($row = $result->fetch_assoc()) {
    $assign[] = $row;
}

header('Content-Type: application/json');
echo json_encode($assign);
?>
