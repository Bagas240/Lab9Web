<!-- modules/user/list.php -->
<?php
$sql = 'SELECT * FROM data_barang';
$result = mysqli_query($conn, $sql);
?>
<section>
    <h2>Data Barang</h2>
    <p><a href="index.php?page=user/add">Tambah Barang</a></p>
    <table border="1" cellpadding="6" cellspacing="0">
        <tr>
            <th>Gambar</th>
            <th>Nama Barang</th>
            <th>Kategori</th>
            <th>Harga Beli</th>
            <th>Harga Jual</th>
            <th>Diskon (10%)</th>
            <th>Stok</th>
            <th>Aksi</th>
        </tr>
        <?php if ($result && mysqli_num_rows($result) > 0): ?>
            <?php while ($row = mysqli_fetch_array($result)): ?>
                <?php
                $gambar = trim((string) $row['gambar']);
                $src = $gambar !== '' ? $gambar : '';
                if ($src !== '' && strpos($src, 'gambar/') !== 0) {
                    $src = 'gambar/' . $src;
                }
                $hargaJual = (float) $row['harga_jual'];
                ?>
                <tr>
                    <td>
                        <?php if ($src !== ''): ?>
                            <img src="<?= e($src); ?>" alt="<?= e((string) $row['nama']); ?>" width="60">
                        <?php endif; ?>
                    </td>
                    <td><?= e(ringkasTeks((string) $row['nama'], 30)); ?></td>
                    <td><?= e((string) $row['kategori']); ?></td>
                    <td><?= e(formatRupiah((float) $row['harga_beli'])); ?></td>
                    <td><?= e(formatRupiah($hargaJual)); ?></td>
                    <td><?= e(formatRupiah(hitungDiskon($hargaJual))); ?></td>
                    <td><?= e((string) $row['stok']); ?></td>
                    <td>
                        <a href="index.php?page=user/edit&id=<?= (int) $row['id_barang']; ?>">Ubah</a>
                        |
                        <form method="post" action="index.php?page=user/delete" style="display:inline;" onsubmit="return confirm('Yakin ingin menghapus data ini?');">
                            <input type="hidden" name="id" value="<?= (int) $row['id_barang']; ?>">
                            <button type="submit">Hapus</button>
                        </form>
                    </td>
                </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr>
                <td colspan="8">Belum ada data</td>
            </tr>
        <?php endif; ?>
    </table>
</section>
