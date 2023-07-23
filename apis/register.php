<?php
include('connection.php');

$username = $_POST['user_name'];
$password = $_POST['user_password'];
$email = $_POST['user_email'];

$check_email = $mysqli->prepare('SELECT user_email FROM users WHERE user_email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

if ($email_exists == 0) {
    if (strlen($password) >= 8) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $query = $mysqli->prepare('INSERT INTO users(user_name, user_email, user_password) VALUES(?,?,?)');
        $query->bind_param('sss', $username, $hashed_password, $email);
        $query->execute();

        $response['status'] = "success";
        $response['message'] = "user added";
    } else {
        $response['status'] = "failed";
        $response['message'] = "Password must be at least 8 characters long.";
    }
} else {
    $response['status'] = "failed";
    $response['message'] = "User already exists.";
}

echo json_encode($response);

