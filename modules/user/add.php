<!-- modules/user/add.php -->
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = trim($_POST['nama'] ?? '');
    $kategori = $_POST['kategori'] ?? '';
    $harga_jual = $_POST['harga_jual'] ?? '';
    $harga_beli = $_POST['harga_beli'] ?? '';
    $stok = $_POST['stok'] ?? '';
    $file_gambar = $_FILES['file_gambar'] ?? null;
    $gambar = null;

    if ($nama === '') {
        setFlash('error', 'Nama barang wajib diisi.');
        header('Location: index.php?page=user/add');
        exit;
    }
    if (!is_numeric($harga_beli) || !is_numeric($harga_jual) || !is_numeric($stok)) {
        setFlash('error', 'Harga dan stok harus berupa angka.');
        header('Location: index.php?page=user/add');
        exit;
    }

    if ($file_gambar && ($file_gambar['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../../gambar/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $filename = str_replace(' ', '_', basename($file_gambar['name']));
        $destination = $uploadDir . $filename;
        if (move_uploaded_file($file_gambar['tmp_name'], $destination)) {
            $gambar = 'gambar/' . $filename;
        }
    }

    $stmt = mysqli_prepare($conn, 'INSERT INTO data_barang (nama, kategori, harga_jual, harga_beli, stok, gambar) VALUES (?, ?, ?, ?, ?, ?)');
    mysqli_stmt_bind_param($stmt, 'ssssss', $nama, $kategori, $harga_jual, $harga_beli, $stok, $gambar);
    $ok = mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    if ($ok) {
        setFlash('success', 'Data barang berhasil ditambahkan.');
    } else {
        setFlash('error', 'Gagal menambahkan data barang.');
    }

    header('Location: index.php?page=user/list');
    exit;
}
?>
<section>
    <h2>Tambah Barang</h2>
    <form method="post" action="index.php?page=user/add" enctype="multipart/form-data">
        <div>
            <label>Nama Barang</label><br>
            <input type="text" name="nama" required>
        </div>
        <div>
            <label>Kategori</label><br>
            <select name="kategori">
                <option value="Komputer">Komputer</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Hand Phone">Hand Phone</option>
            </select>
        </div>
        <div>
            <label>Harga Jual</label><br>
            <input type="text" name="harga_jual" required>
        </div>
        <div>
            <label>Harga Beli</label><br>
            <input type="text" name="harga_beli" required>
        </div>
        <div>
            <label>Stok</label><br>
            <input type="text" name="stok" required>
        </div>
        <div>
            <label>File Gambar</label><br>
            <input type="file" name="file_gambar">
        </div>
        <div>
            <button type="submit">Simpan</button>
        </div>
    </form>
</section>
