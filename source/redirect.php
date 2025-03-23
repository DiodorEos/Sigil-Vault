<?php
header('Content-Type: application/json'); // Set the content type to JSON
// Load the environment variables
require_once __DIR__ . '/vendor/autoload.php'; // Autoload Composer dependencies

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load(); // Load the .env file
// Database connection
$host = $_ENV['DB_HOST'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$database = $_ENV['DB_NAME'];

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Retrieve shortcode from the URL
if (isset($_GET["shortcode"])) {
    $shortcode = trim($_GET["shortcode"]);

    // Prepare the query to fetch the original URL
    $stmt = $conn->prepare("SELECT original_url FROM urls WHERE shortcode = ?");
    $stmt->bind_param("s", $shortcode);
    $stmt->execute();
    $stmt->bind_result($original_url);

    // If the shortcode is found, redirect to the original URL
    if ($stmt->fetch()) {
        header("Location: " . $original_url);
        exit; // Exit to avoid any further processing
    } else {
        // If shortcode is not found, return error
        echo json_encode(["error" => "Shortcode not found"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "No shortcode provided"]);
}

$conn->close();
?>
