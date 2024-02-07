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
$field = $data['field'];
$value = $data['value'];

$value = trim($value); 
$value = filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS); 


$query = "SELECT COUNT(*) AS count FROM users WHERE $field = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param('s', $value);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$count = $row['count'];


$response = array('available' => $count === 0);
echo json_encode($response);


$stmt->close();
$mysqli->close();
?>
