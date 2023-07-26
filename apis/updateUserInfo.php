<?php
include('connection.php');

$user_id = $_GET['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $updatedName = $_POST['user_name'];
    $updatedEmail = $_POST['user_email'];

    $stmt = $mysqli->prepare("SELECT user_id FROM users WHERE user_email = ? AND user_id <> ?");
    $stmt->bind_param("si", $updatedEmail, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response = array(
            'success' => false,
            'message' => 'Email already in use by another user.'
        );
    } else {
        $stmt = $mysqli->prepare("UPDATE users 
                             SET user_name = ?, user_email = ?
                             WHERE user_id = ?");

        $stmt->bind_param("ssi", $updatedName, $updatedEmail, $user_id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array(
                'success' => true,
                'message' => 'User information updated successfully.'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'No changes made to the user information.'
            );
        }
    }

    $stmt->close();

    header('Content-Type: application/json');

    echo json_encode($response);
}
?>
