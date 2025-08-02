<?php
// Default: JSON response unless overridden
header('Content-Type: application/json');

// Database connection - same as the database.php
$host = "127.0.0.1";
$username = "your database user";
$password = "password";
$database = "the database's name";

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Retrieve shortcode from the URL
if (isset($_GET["shortcode"])) {
    $shortcode = trim($_GET["shortcode"]);

    // Fetch original URL and PIN
    $stmt = $conn->prepare("SELECT original_url, pin FROM urls WHERE shortcode = ?");
    $stmt->bind_param("s", $shortcode);
    $stmt->execute();
    $stmt->bind_result($original_url, $pin);

    if ($stmt->fetch()) {
        $stmt->close();

        // If a PIN is set, handle validation
        if (!empty($pin)) {
            // Handle POST PIN submission
            if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["pin"])) {
                $submitted_pin = trim($_POST["pin"]);
                if ($submitted_pin === $pin) {
                    header("Location: " . $original_url);
                    exit;
                } else {
                    $error = "Invalid PIN. Please try again.";
                }
            }

            // Show PIN form (override content type)
            header("Content-Type: text/html; charset=UTF-8");
            ?>
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>PIN Required – Sigil Vault</title>
                <style>
                    body {
                        background-color: #121C2B;
                        color: #F0F2F5;
                        font-family: 'Manrope', sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        flex-direction: column;
                    }
                    form {
                        background-color: #243545;
                        padding: 1.5rem 2rem;
                        border-radius: 1rem;
                        box-shadow: 0 6px 16px rgba(0,0,0,0.5);
                        text-align: center;
                    }
                    input[type="text"] {
                        padding: 0.5rem;
                        font-size: 1rem;
                        border-radius: 0.5rem;
                        border: 2px solid #3B4D5D;
                        text-align: center;
                        width: 5rem;
                        margin-top: 0.5rem;
                        background-color: #121C2B;
                        color: white;
                    }
                    button {
                        margin-top: 1rem;
                        padding: 0.5rem 1rem;
                        background-color: #960018;
                        border: none;
                        color: white;
                        border-radius: 0.5rem;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .error {
                        color: #e67c3a;
                        margin-top: 1rem;
                    }
                </style>
            </head>
            <body>
                <form method="POST">
                    <h2>🔒 This link is PIN-protected</h2>
                    <label for="pin">Enter PIN:</label><br>
                    <input type="text" name="pin" maxlength="4" pattern="\d{4}" required>
                    <br>
                    <button type="submit">Unlock</button>
                    <?php if (isset($error)) echo "<div class='error'>$error</div>"; ?>
                </form>
            </body>
            </html>
            <?php
            exit;
        } else {
            // No PIN set — direct redirect
            header("Location: " . $original_url);
            exit;
        }

    } else {
        // Shortcode not found
        http_response_code(404);
        $isBrowser = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'text/html') !== false;
        if ($isBrowser) {
            header("Location: /404.html");
        } else {
            echo json_encode(["error" => "Shortcode not found"]);
        }
        exit;
    }

} else {
    http_response_code(400);
    echo json_encode(["error" => "No shortcode provided"]);
}

$conn->close();
?>
