<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$request_uri = $_SERVER['REQUEST_URI'];
$script_name = $_SERVER['SCRIPT_NAME'];

$path = str_replace(dirname($script_name), '', $request_uri);
$path = parse_url($path, PHP_URL_PATH);
$segments = array_values(array_filter(explode('/', $path)));

if (empty($segments[0])) {
    echo "<h1>Portfolio API Backend</h1>";
    echo "<p>Welcome to the Portfolio API!</p>";
    echo "<h3>Available endpoints:</h3>";
    echo "<ul>";
    echo "<li><a href='/api/health'>GET /api/health</a> - Health check</li>";
    echo "<li><a href='/api/v1/projects'>GET /api/v1/projects</a> - Get all projects</li>";
    echo "<li>POST /api/contact - Submit contact form</li>";
    echo "</ul>";
    echo "<p>Frontend: <a href='http://localhost:5173'>http://localhost:5173</a></p>";
} elseif ($segments[0] === 'api') {
    if ($segments[1] === 'health') {
        require_once __DIR__ . '/api/health.php';
    } elseif ($segments[1] === 'v1' && $segments[2] === 'projects') {
        require_once __DIR__ . '/api/v1/projects.php';
    } elseif ($segments[1] === 'contact') {
        require_once __DIR__ . '/api/contact.php';
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'API endpoint not found']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}
