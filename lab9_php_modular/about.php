<?php
require_once __DIR__ . '/header.php';
require_once __DIR__ . '/helpers.php';
?>

<section class="content">
    <h2>Tentang Aplikasi</h2>
    <p>Halaman ini menjelaskan tujuan aplikasi.</p>
    <p>Status nilai 88: <?php echo e(tentukanStatusNilai(88)); ?></p>
    <p>Diskon 10% dari Rp 200.000: <?php echo formatRupiah(hitungDiskon(200000)); ?></p>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
