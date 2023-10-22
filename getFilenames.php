<?php
// Specify the directory path--------

$directory = './img';  //  <<======||

// ----------------------------------

if (is_dir($directory)) {
    $files = array_diff(scandir($directory), array());
    header('Content-Type: application/json');
    echo json_encode($files);
} else {
    echo json_encode(array('error' => 'Directory not found'));
}
?>