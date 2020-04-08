<?php
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET') {
    $file = '../../.env';
    $file_lines = file($file);
    foreach ($file_lines as $line) {
        echo $line;
    }
}
?>