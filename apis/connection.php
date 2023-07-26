<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Content-Type: application/json');

$mysqli = new mysqli("localhost","root",'AE.1234', "classroom_db");
if (!$mysqli) {
    die('a connection was unsuccesful');
}
