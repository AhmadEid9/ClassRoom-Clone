<?php
include('connection.php');

$user_id = $_GET['user_id'];

$stmt = $mysqli->prepare("SELECT user_name, user_email
                         FROM users 
                         WHERE user_id = ?");

$stmt->bind_param("i", $user_id);
$stmt->execute();

$response = $stmt->get_result();

if ($response->num_rows > 0) {
    $user = $response->fetch_assoc();

    header('Content-Type: application/json');

    echo json_encode($user);
} else {
    echo "User not found.";
}
?>
