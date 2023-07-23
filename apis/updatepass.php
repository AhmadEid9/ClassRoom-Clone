<?php
include('connection.php');

$email = $_POST['user_email'];
$password = $_POST['user_password'];

$check_email = $mysqli->prepare('SELECT user_email FROM users WHERE user_email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

if ($email_exists > 0) {
    if (strlen($password) >= 8) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $query = $mysqli->prepare('UPDATE users SET user_password=? WHERE user_email=?');
        $query->bind_param('ss', $hashed_password, $email);
        $query->execute();

        $response['status'] = "success";
        $response['message'] = "Password changed successfully";
    } else {
        $response['status'] = "failed";
        $response['message'] = "Password must be at least 8 characters long";
    }
} else {
    $response['status'] = "failed";
    $response['message'] = "Email does not exist";
}

echo json_encode($response);
?>
