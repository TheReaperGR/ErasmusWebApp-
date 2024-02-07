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

$Email = isset($_POST["email"]) ? $_POST["email"] : null;
$password = isset($_POST["pass"]) ? $_POST["pass"] : null;
$hashEmail = hash('sha256', $Email);




$query = "SELECT * FROM users WHERE Email = ?";
$stmt = $mysqli->prepare($query);

if ($stmt) {
    $stmt->bind_param('s', $Email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $stored_hash = $row['Hash_Passwd'];
        $admin = $row['Admin'];

        if (password_verify($password, $stored_hash)) {
            setcookie("logged_in", "7aBc55eF", time() + (86400 * 30), "/");
            setcookie("admin", $admin, time() + (86400 * 30), "/");
            setcookie("data",$hashEmail,time() + (86400 * 30), "/");

            $query = "SELECT First_Name, Last_Name, AM FROM users WHERE Email = ?";
            $stmt = $mysqli->prepare($query);

            header("Location: ../login.html");
            exit();

        } else {
            setcookie("logged_in", "$4gK9@yD", time() + (86400 * 30), "/");
            setcookie("admin", 0, time() + (86400 * 30), "/");
            header("Location: ../login.html");
            exit();
        }
    } else {
        setcookie("logged_in", "$4gK9@yD", time() + (86400 * 30), "/");
        setcookie("admin", 0, time() + (86400 * 30), "/");
        header("Location: ../login.html");
        exit();
    }

    $stmt->close();
} else {
    echo "Error: " . $mysqli->error;
}

$mysqli->close();
?>
