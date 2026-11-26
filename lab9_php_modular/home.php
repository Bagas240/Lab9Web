<?php
require_once __DIR__ . '/header.php';
require_once __DIR__ . '/helpers.php';
?>

<section class="content">
    <h2>Halaman Home</h2>
    <p>Ini adalah konten khusus halaman beranda.</p>
    <p>Konversi 30°C ke Fahrenheit: <?php echo konversiCelciusKeFahrenheit(30); ?>°F</p>
    <p>Total belanja (Rp 50.000 x 3): <?php echo formatRupiah(hitungTotal(50000, 3)); ?></p>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
