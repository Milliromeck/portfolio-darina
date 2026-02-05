<?php
echo "<h1>MySQL Connection Test</h1>";

$host = getenv('MYSQL_HOST') ?: 'mysql';
$user = getenv('MYSQL_USER') ?: 'root';
$pass = getenv('MYSQL_PASSWORD') ?: 'password';
$dbname = getenv('MYSQL_DATABASE') ?: 'portfolio';

echo "<p>Host: $host</p>";
echo "<p>User: $user</p>";
echo "<p>Database: $dbname</p>";

try {
    $conn = new mysqli($host, $user, $pass);
    
    if ($conn->connect_error) {
        echo "<p style='color: red;'> Connection failed: " . $conn->connect_error . "</p>";
    } else {
        echo "<p style='color: green;'> Connected to MySQL server!</p>";
        
        if ($conn->query("CREATE DATABASE IF NOT EXISTS $dbname")) {
            echo "<p style='color: green;'> Database '$dbname' ready</p>";
        }
        
        $conn->select_db($dbname);
        
        echo "<p style='color: green;'> Using database '$dbname'</p>";
        
        $conn->close();
    }
} catch (Exception $e) {
    echo "<p style='color: red;'> Exception: " . $e->getMessage() . "</p>";
}
?>