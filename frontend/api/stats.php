<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = getenv('MYSQL_HOST') ?: 'mysql';
$user = getenv('MYSQL_USER') ?: 'root';
$pass = getenv('MYSQL_PASSWORD') ?: 'password';
$dbname = getenv('MYSQL_DATABASE') ?: 'portfolio';

try {
    $conn = new mysqli($host, $user, $pass, $dbname);
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $conn->query("
            CREATE TABLE IF NOT EXISTS page_views (
                id INT AUTO_INCREMENT PRIMARY KEY,
                page_url VARCHAR(255) NOT NULL,
                page_title VARCHAR(255),
                view_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        $stmt = $conn->prepare("INSERT INTO page_views (page_url, page_title) VALUES (?, ?)");
        $page_url = $input['page_url'] ?? '/';
        $page_title = $input['page_title'] ?? 'Unknown';
        $stmt->bind_param("ss", $page_url, $page_title);
        $stmt->execute();
        
        echo json_encode(['success' => true]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

        $result = $conn->query("
            SELECT 
                COUNT(*) as total_views,
                COUNT(DISTINCT page_url) as unique_pages,
                DATE(view_time) as date
            FROM page_views 
            GROUP BY DATE(view_time)
            ORDER BY date DESC
            LIMIT 7
        ");
        
        $stats = [];
        while ($row = $result->fetch_assoc()) {
            $stats[] = $row;
        }
        
        $result = $conn->query("
            SELECT page_url, page_title, COUNT(*) as views 
            FROM page_views 
            GROUP BY page_url, page_title 
            ORDER BY views DESC 
            LIMIT 5
        ");
        
        $popular = [];
        while ($row = $result->fetch_assoc()) {
            $popular[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'stats' => $stats,
            'popular_pages' => $popular,
            'database' => $dbname
        ]);
    }
    
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>