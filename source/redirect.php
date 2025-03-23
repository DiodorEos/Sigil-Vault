<?php
header('Content-Type: application/json'); // Set the content type to JSON

// Database connection
$host = "127.0.0.1";
$username = "u263186678_diodoreos";
$password = "+E4Th3D34l!?0";
$database = "u263186678_NeoSigilVault";

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
