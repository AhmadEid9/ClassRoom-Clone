<?php
include('connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['class_id']) && isset($_GET['post_id'])) {
        $class_id = $_GET['class_id'];
        $post_id = $_GET['post_id'];

        $stmt = $mysqli->prepare("SELECT p.*, u.user_name AS teacher_name 
                                 FROM posts AS p
                                 JOIN users AS u ON p.post_teacher = u.user_id
                                 WHERE p.post_class = ? AND p.post_id = ?");
        $stmt->bind_param("ii", $class_id, $post_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $assignment = $result->fetch_assoc();

            header('Content-Type: application/json');
            echo json_encode($assignment);
        } else {
            $response = array(
                'error' => 'Post not found.'
            );

            header('Content-Type: application/json');
            echo json_encode($response);
        }

        $stmt->close();
    } else {
        $response = array(
            'error' => 'Post ID and Class ID must be provided in the query parameters.'
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
?>
