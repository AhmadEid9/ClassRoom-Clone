<?php
include('connection.php');

$post_title = $_POST['post_title'];
$post_description = $_POST['post_description'];

$class_id = $_POST['class_id'];
$user_id = $_POST['user_id'];

$check_post = $mysqli->prepare('SELECT post_title FROM posts WHERE post_title=? AND post_class=?');
$check_post->bind_param('si', $post_title, $class_id);
$check_post->execute();
$check_post->store_result();
$post_exists = $check_post->num_rows();

if ($post_exists == 0) {
    if (strlen($post_title) == 0) {
        $response['status'] = "failed";
        $response['message'] = "Post Title Can't be empty";
    } else {
        $query = $mysqli->prepare('INSERT INTO posts(post_title, post_description, post_class, post_teacher) VALUES(?,?,?,?)');
        $query->bind_param('ssii', $post_title, $post_description, $class_id, $user_id);
        $query->execute();

        $response['status'] = "success";
        $response['message'] = "post added";
    }
} else {
    $response['status'] = "failed";
    $response['message'] = "post already exists";
}

echo json_encode($response);

