<?php
include('connection.php');

$classId = $_POST['class_id'];
$userId = $_POST['user_id'];

$query = $mysqli->prepare("SELECT DISTINCT *
                            FROM classes cls
                            LEFT JOIN posts pst ON cls.class_id = pst.post_class
                            LEFT JOIN assignments asgn ON cls.class_id = asgn.assignment_class
                            LEFT JOIN user_classes usr_cls ON cls.class_id = usr_cls.class_id
                            WHERE cls.class_id = ? and usr_cls.user_id =? ;"
                         );
$query->bind_param("ii", $classId, $userId);
$query->execute();
$result = $query->get_result();
$class_exists = $query->num_rows();

if ($class_exists == 0) {
    $classes = array();
    while ($row = $result->fetch_assoc()) {
        $classes[] = $row;
    }
	header('Content-Type: application/json');
	echo json_encode($classes);
} else{
    $response['status'] = "failed";
    $response['message'] = "This class ID doesn't exist";
    echo json_encode($response);
}
?>
