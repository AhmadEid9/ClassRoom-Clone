<?php
include('connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($_POST['class_id']) &&
        isset($_POST['user_id']) &&
        isset($_POST['assignment_id']) &&
        isset($_FILES['submitted_files'])
    ) {
        $class_id = $_POST['class_id'];
        $user_id = $_POST['user_id'];
        $assignment_id = $_POST['assignment_id'];

        $uploadedFiles = $_FILES['submitted_files'];

        function convertFilesToBase64($files)
        {
            $base64Files = [];

            foreach ($files['error'] as $index => $error) {
                if ($error === UPLOAD_ERR_OK) {
                    $tmpFilePath = $files['tmp_name'][$index];
                    $fileContent = base64_encode(file_get_contents($tmpFilePath));
                    $base64Files[] = $fileContent;
                }
            }

            return $base64Files;
        }

        $submittedFilesBase64 = convertFilesToBase64($uploadedFiles);

        $stmt = $mysqli->prepare("INSERT INTO user_assignments (class_id, user_id, assignment_id, submitted_files) 
                                 VALUES (?, ?, ?, ?)");
        
        $submittedFilesBase64String = implode(', ', $submittedFilesBase64);
        
        $stmt->bind_param("iiis", $class_id, $user_id, $assignment_id, $submittedFilesBase64String);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array(
                'success' => true,
                'message' => 'Assignment submission successful.'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Failed to submit assignment.'
            );
        }

        $stmt->close();

        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        $response = array(
            'error' => 'Class ID, User ID, Assignment ID, and Submitted Files must be provided in the form data.'
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
?>
