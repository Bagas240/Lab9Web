<?php
// config/database.php
$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'latihan1';

$conn = mysqli_connect($host, $user, $pass, $db);
if ($conn == false) {
    error_log('Koneksi ke server gagal.');
    http_response_code(500);
    exit('Terjadi kesalahan pada koneksi database.');
}
?>
