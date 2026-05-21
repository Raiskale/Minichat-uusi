<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");


$host = "localhost";
$user = "root";
$pass = ""; 
$db = "minichat";


$conn = new mysqli($host, $user, $pass, $db);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die(json_encode(["error" => "Tietokantayhteys epäonnistui"]));
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM viestit ORDER BY timestamp ASC");
    $viestit = [];
    
    while($row = $result->fetch_assoc()) {
        $viestit[] = $row;
    }
    
    echo json_encode($viestit);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['sender']) && isset($data['text'])) {
        $sender = $conn->real_escape_string($data['sender']);
        $text = $conn->real_escape_string($data['text']);
        
        $sql = "INSERT INTO viestit (sender, text) VALUES ('$sender', '$text')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Tallennus epäonnistui"]);
        }
    } else {
        echo json_encode(["error" => "Puuttuvia tietoja"]);
    }
}

$conn->close();
?>