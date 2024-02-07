<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'erasmus_app';

$mysqli = new mysqli($host, $username, $password, $database);


if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit;
}


$data = json_decode(file_get_contents('php://input'), true);
$firstName = $data['fname'];
$lastName = $data['lname'];
$am = $data['am'];
$phone = $data['phone'];
$email = $data['email'];
$username = $data['usr'];
$password = $data['pass'];
$admin = 0;
$hashPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO `users` (`ID`, `First_Name`, `Last_Name`, `AM`, `Phone`, `Email`, `Username`, `Hash_Passwd`, `Admin`) 
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";


$stmt = $mysqli->prepare($sql);


$stmt->bind_param("sssssssi", $firstName, $lastName, $am, $phone, $email, $username, $hashPassword, $admin);


$stmt->execute();


if ($stmt->affected_rows > 0) {

    http_response_code(200);

} else {

    http_response_code(500);

}


$stmt->close();


$mysqli->close();

?>
