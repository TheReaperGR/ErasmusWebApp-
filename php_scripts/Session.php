<?php
session_start(); 

if (!isset($_SESSION['session_id'])) {

  $sessionId = bin2hex(random_bytes(16)); 


  setcookie('session_id', $sessionId, time() + (7 * 24 * 60 * 60), '/', '', false, true); 


  setcookie('logged_in', '$4gK9@yD', time() + (7 * 24 * 60 * 60), '/', '', false, true); 
  setcookie('admin', 'false', time() + (7 * 24 * 60 * 60), '/', '', false, true); 


  $_SESSION['session_id'] = $sessionId;

  echo 'New session ID generated: ' . $sessionId;
  header("Location: ../login.html");
  exit();
} else {
  $sessionId = $_SESSION['session_id'];
  echo 'Session ID already exists: ' . $sessionId;
}
?>