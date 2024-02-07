<?php
$file_path = 'login.txt'; 


if (file_exists($file_path)) {

  $file_contents = file_get_contents($file_path);


  echo $file_contents;
} else {

  echo 'File not found';
}
?>
