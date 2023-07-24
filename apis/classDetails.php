<?php
include('connection.php');

$classId = $_POST['class_id'];

$query = $mysqli->prepare("SELECT *
                          FROM classes cls, posts pst, assignments asgn, user_classes usr_cls
                          WHERE cls.class_id = ? AND
	                        cls.class_id = asgn.assignment_class AND
                            pst.post_class = cls.class_id AND
                            cls.class_id = usr_cls.class_id;"
                         );
$query->bind_param("i", $classId);
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
