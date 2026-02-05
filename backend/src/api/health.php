<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../config/database.php';

$response = [
    'status' => 'healthy',
    'timestamp' => date('Y-m-d H:i:s'),
    'services' => []
];

try {
    $conn = getDatabaseConnection();
    $result = $conn->query("SELECT 1 as db_status");
    $response['services']['database'] = $result ? 'connected' : 'disconnected';
    $conn->close();
} catch (Exception $e) {
    $response['services']['database'] = 'error: ' . $e->getMessage();
    $response['status'] = 'unhealthy';
}

echo json_encode($response, JSON_PRETTY_PRINT);
