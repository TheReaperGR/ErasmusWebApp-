<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'erasmus_app';

$mysqli = new mysqli($host, $username, $password, $database);

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

$hashEmail = $_COOKIE['data'];

$query = "SELECT First_Name, Last_Name, AM, Email FROM users";
$stmt = $mysqli->prepare($query);
$stmt->execute();

$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $email = $row['Email'];
    $emailHashDB = hash('sha256', $email);

    if ($hashEmail === $emailHashDB) {
        $fname = $row['First_Name'];
        $lname = $row['Last_Name'];
        $am = $row['AM'];

        // Return a JSON response indicating success and passing the data
        $response = array(
            'success' => true,
            'fname' => $fname,
            'lname' => $lname,
            'am' => $am
        );
        echo json_encode($response);
        exit(); // Exit the script after finding a match
    }
}

// Return a JSON response indicating failure
$response = array('success' => false);
echo json_encode($response);

$stmt->close();

?>
