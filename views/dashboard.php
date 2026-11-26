<!-- views/dashboard.php -->
<section class="content">
    <h2>Halaman Dashboard</h2>
    <p>Ini adalah konten khusus halaman beranda.</p>
    <p>Contoh formatRupiah: <?php echo e(formatRupiah(150000)); ?></p>
    <p>Contoh hitungDiskon (10%): <?php echo e(formatRupiah(hitungDiskon(200000))); ?></p>
    <p>Contoh validasiEmail: <?php echo validasiEmail('admin@contoh.com') ? 'Valid' : 'Tidak valid'; ?></p>
    <p>Contoh ringkasTeks: <?php echo e(ringkasTeks('Aplikasi PHP modular memisahkan template, helper, konfigurasi, dan modul fitur.', 45)); ?></p>
    <p><a href="index.php?page=user/list">Lihat Data Barang</a></p>
</section>
