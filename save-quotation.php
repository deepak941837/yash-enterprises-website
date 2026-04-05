<?php
$conn = new mysqli("localhost", "root", "", "yash_db");

$name = $_POST['name'];
$phone = $_POST['phone'];
$service = $_POST['serviceType'];
$location = $_POST['location'];
$cameras = $_POST['cameras'];
$coverage = $_POST['coverage'];
$description = $_POST['description'];

$stmt = $conn->prepare("INSERT INTO quotations 
(name, phone, service, location, cameras, coverage, description) 
VALUES (?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssssss", $name, $phone, $service, $location, $cameras, $coverage, $description);

$stmt->execute();

echo "Success";
?>