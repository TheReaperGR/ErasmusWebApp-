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

$name = $_POST['name'];
$lastname = $_POST['lastname'];
$AM = $_POST['AM'];
$passedLessonsPre = $_POST['passedLessonsPre'];
$avgPassedLessons = $_POST['avgPassedLessons'];
$englishLevel = $_POST['englishLevel'];
$extraLang = $_POST['extraLang'];
$partnerUni1 = $_POST['partnerUni1'];
$partnerUni2 = $_POST['partnerUni2'];
$partnerUni3 = $_POST['partnerUni3'];

$folderPath = 'uploads/' . $AM;
if (!file_exists($folderPath)) {
  mkdir($folderPath, 0777, true);
}

$fullGradeFile = $_FILES['fullGrade'];
$englishCertFile = $_FILES['englishCert'];
$otherCertFiles = $_FILES['otherCert'];

$fullGradePath = $folderPath . '/' . $fullGradeFile['name'];
$englishCertPath = $folderPath . '/' . $englishCertFile['name'];

move_uploaded_file($fullGradeFile['tmp_name'], $fullGradePath);
move_uploaded_file($englishCertFile['tmp_name'], $englishCertPath);

$otherCertPaths = array();
for ($i = 0; $i < count($otherCertFiles['tmp_name']); $i++) {
  $certFileName = $otherCertFiles['name'][$i];
  $certFilePath = $folderPath . '/' . $certFileName;
  move_uploaded_file($otherCertFiles['tmp_name'][$i], $certFilePath);
  $otherCertPaths[] = $certFilePath;
}

$sql = "INSERT INTO `applications` (`ID`, `First_Name`, `Last_name`, `AM`, `Passed_pres`, `Passed_avg`, `English_Level`, `Other_lang`, `Uni1`, `Uni2`, `Uni3`, `Full_Score_Path`, `English_Cert`, `Other_Lang_Cert`) 
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($mysqli, $sql);

mysqli_stmt_bind_param($stmt, "sssssssssssss", $name, $lastname, $AM, $passedLessonsPre, $avgPassedLessons, $englishLevel, $extraLang, $partnerUni1, $partnerUni2, $partnerUni3, $fullGradePath, $englishCertPath, implode(",", $otherCertPaths));

if (mysqli_stmt_execute($stmt)) {
  $response = array('status' => 'success', 'message' => 'Form submitted successfully!');
  echo json_encode($response);
} else {
  $response = array('status' => 'error', 'message' => 'Form submission failed. Please try again.');
  echo json_encode($response);
}

mysqli_stmt_close($stmt);
$mysqli->close();
?>
