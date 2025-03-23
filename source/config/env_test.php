<?php
// Load the environment variables
require_once __DIR__ . '/vendor/autoload.php'; // Autoload Composer dependencies

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load(); // Load the .env file

// Test if the DB environment variables are working
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Environment Variables Test</title>
</head>
<body>
    <h1>Database Environment Variables</h1>
    <strong><p><?php echo 'Loaded .env file: ' . (file_exists('.env') ? 'Yes' : 'No'); ?></p></strong>
    <p>Host: <?php echo $_ENV['DB_HOST']; ?></p>
    <p>Username: <?php echo $_ENV['DB_USERNAME']; ?></p>
    <p>Password: <?php echo $_ENV['DB_PASSWORD']; ?></p>
    <p>Database: <?php echo $_ENV['DB_NAME']; ?></p>
</body>
</html>
