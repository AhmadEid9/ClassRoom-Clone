<?php
include('connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['class_id']) && isset($_GET['assignment_id'])) {
        $assignment_class = $_GET['assignment_class'];
        $assignment_id = $_GET['assignment_id'];

        $stmt = $mysqli->prepare("SELECT a.*, u.user_name AS teacher_name 
                                 FROM assignments AS a
                                 JOIN users AS u ON a.assignment_teacher = u.user_id
                                 WHERE a.assignment_class = ? AND a.assignment_id = ?");
        $stmt->bind_param("ii", $assignment_class, $assignment_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $assignment = $result->fetch_assoc();

            header('Content-Type: application/json');
            echo json_encode($assignment);
        } else {
            $response = array(
                'error' => 'Assignment not found.'
            );

            header('Content-Type: application/json');
            echo json_encode($response);
        }

        $stmt->close();
    } else {
        $response = array(
            'error' => 'Class ID and Assignment ID must be provided in the query parameters.'
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
?>
