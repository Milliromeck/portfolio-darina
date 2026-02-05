<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $conn = getDatabaseConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $query = "SELECT * FROM projects ORDER BY sort_order, created_at DESC";
        $result = $conn->query($query);
        
        $projects = [];
        while ($row = $result->fetch_assoc()) {
            if (!empty($row['technologies'])) {
                $row['technologies'] = json_decode($row['technologies'], true);
            }
            $projects[] = $row;
        }
        
        echo json_encode([
            'status' => 'success',
            'count' => count($projects),
            'projects' => $projects
        ]);
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
    
    $conn->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
