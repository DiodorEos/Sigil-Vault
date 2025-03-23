<?php
header('Content-Type: application/json'); // Set the content type to JSON
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load(); // Load the .env file
// Database connection
$conn = new mysqli(
    $_ENV['DB_HOST'],
    $_ENV['DB_USERNAME'],
    $_ENV['DB_PASSWORD'],
    $_ENV['DB_NAME']
);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Handle checking if URL already exists
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["original_url"])) {
    $original_url = trim($_GET["original_url"]);

    $stmt = $conn->prepare("SELECT shortcode FROM urls WHERE original_url = ?");
    $stmt->bind_param("s", $original_url);
    $stmt->execute();
    $stmt->bind_result($shortcode);

    if ($stmt->fetch()) {
        echo json_encode(["shortcode" => $shortcode]);
        $stmt->close();
        $conn->close();
        exit; // Ensure no further output is sent
    } else {
        echo json_encode(["error" => "URL not found"]);
    }

    $stmt->close();
    $conn->close();
    exit; // Ensure no further output is sent
}

// Handle POST request to store URL
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $shortcode = trim($_POST["shortcode"]);
    $original_url = trim($_POST["original_url"]);

    // Input validation
    if (!filter_var($original_url, FILTER_VALIDATE_URL)) {
        die(json_encode(["error" => "Invalid URL format"]));
    }
    if (!preg_match("/^[a-zA-Z0-9_-]{3,20}$/", $shortcode)) {
        die(json_encode(["error" => "Invalid shortcode format"]));
    }

    // Check if the shortcode already exists in the database
    $stmt = $conn->prepare("SELECT shortcode FROM urls WHERE shortcode = ?");
    $stmt->bind_param("s", $shortcode);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Shortcode already exists
        echo json_encode(["error" => "Shortcode already exists"]);
    } else {
        // Insert new URL and shortcode into the database
        $stmt = $conn->prepare("INSERT INTO urls (shortcode, original_url) VALUES (?, ?)");
        $stmt->bind_param("ss", $shortcode, $original_url);

        if ($stmt->execute()) {
            echo json_encode(["success" => "URL stored successfully"]);
        } else {
            echo json_encode(["error" => "Failed to store URL"]);
        }
    }

    $stmt->close();
    $conn->close();
    exit; // Ensure no further output is sent
}
?>
