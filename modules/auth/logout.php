<!-- modules/auth/logout.php -->
<?php
unset($_SESSION['user']);
setFlash('success', 'Anda telah keluar dari sesi.');
header('Location: index.php?page=auth/login');
exit;
?>
