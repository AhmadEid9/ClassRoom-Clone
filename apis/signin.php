<?php
include('connection.php');

$email = $_POST['user_email'];
$password = $_POST['user_password'];

$query = $mysqli->prepare('select user_id,user_name,user_password,user_email
from users 
where user_email=?');
$query->bind_param('s', $email);
$query->execute();

$query->store_result();
$query->bind_result($id, $username, $hashed_password, $email);
$query->fetch();

$num_rows = $query->num_rows();
if ($num_rows == 0) {
    $response['status'] = "User not found";
} else {
    if (password_verify($password, $hashed_password)) {
        $response['status'] = 'logged in';
        $response['user_id'] = $id;
        $response['user_name'] = $username;
        $response['user_email'] = $email;
    } else {
        $response['status'] = "Wrong password";
    }
}
echo json_encode($response);
