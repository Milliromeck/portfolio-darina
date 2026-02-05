<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

mb_internal_encoding('UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

$json = file_get_contents('php://input');
$input = json_decode($json, true);

if (function_exists('mb_detect_encoding')) {
    $encoding = mb_detect_encoding($json, 'UTF-8, ISO-8859-1', true);
    if ($encoding !== 'UTF-8') {
        $json = mb_convert_encoding($json, 'UTF-8', $encoding);
        $input = json_decode($json, true);
    }
}

if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields'], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = trim($input['name']);
$email = trim($input['email']);
$message = trim($input['message']);

if (function_exists('mb_detect_encoding')) {
    if (mb_detect_encoding($name, 'UTF-8', true) !== 'UTF-8') {
        $name = mb_convert_encoding($name, 'UTF-8', 'auto');
    }
    if (mb_detect_encoding($message, 'UTF-8', true) !== 'UTF-8') {
        $message = mb_convert_encoding($message, 'UTF-8', 'auto');
    }
}

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (mb_strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(['error' => 'Message must be at least 10 characters'], JSON_UNESCAPED_UNICODE);
    exit;
}

$host = 'mysql';
$user = 'root';
$password = 'password';
$database = 'portfolio';

try {
    $dsn = "mysql:host=$host;dbname=$database;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
    ]);
    
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)");
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':message' => $message
    ]);
    
    $response = [
        'status' => 'success',
        'message' => 'Contact message saved successfully',
        'id' => $pdo->lastInsertId()
    ];
    http_response_code(201);
    
} catch (PDOException $e) {
    http_response_code(500);
    $response = [
        'status' => 'error',
        'message' => 'Server error: ' . $e->getMessage()
    ];
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
