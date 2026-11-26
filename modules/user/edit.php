<!-- modules/user/edit.php -->
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    $nama = trim($_POST['nama'] ?? '');
    $kategori = $_POST['kategori'] ?? '';
    $harga_jual = $_POST['harga_jual'] ?? '';
    $harga_beli = $_POST['harga_beli'] ?? '';
    $stok = $_POST['stok'] ?? '';
    $file_gambar = $_FILES['file_gambar'] ?? null;
    $gambar = null;

    if (!$id || $nama === '' || !is_numeric($harga_beli) || !is_numeric($harga_jual) || !is_numeric($stok)) {
        setFlash('error', 'Gagal mengubah data barang: input tidak valid.');
        header('Location: index.php?page=user/list');
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

    if ($gambar) {
        $stmt = mysqli_prepare($conn, 'UPDATE data_barang SET nama = ?, kategori = ?, harga_jual = ?, harga_beli = ?, stok = ?, gambar = ? WHERE id_barang = ?');
        mysqli_stmt_bind_param($stmt, 'ssssssi', $nama, $kategori, $harga_jual, $harga_beli, $stok, $gambar, $id);
    } else {
        $stmt = mysqli_prepare($conn, 'UPDATE data_barang SET nama = ?, kategori = ?, harga_jual = ?, harga_beli = ?, stok = ? WHERE id_barang = ?');
        mysqli_stmt_bind_param($stmt, 'sssssi', $nama, $kategori, $harga_jual, $harga_beli, $stok, $id);
    }
    $ok = mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    if ($ok) {
        setFlash('success', 'Data barang berhasil diperbarui.');
    } else {
        setFlash('error', 'Gagal memperbarui data barang.');
    }

    header('Location: index.php?page=user/list');
    exit;
}

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id) {
    setFlash('error', 'ID barang tidak valid.');
    header('Location: index.php?page=user/list');
    exit;
}

$stmt = mysqli_prepare($conn, 'SELECT * FROM data_barang WHERE id_barang = ?');
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$data = $result ? mysqli_fetch_array($result) : null;
mysqli_stmt_close($stmt);

if (!$data) {
    setFlash('error', 'Data barang tidak ditemukan.');
    header('Location: index.php?page=user/list');
    exit;
}

function is_select($var, $val) {
    return $var == $val ? 'selected="selected"' : '';
}
?>
<section>
    <h2>Ubah Barang</h2>
    <form method="post" action="index.php?page=user/edit" enctype="multipart/form-data">
        <div>
            <label>Nama Barang</label><br>
            <input type="text" name="nama" value="<?= e((string) $data['nama']); ?>" required>
        </div>
        <div>
            <label>Kategori</label><br>
            <select name="kategori">
                <option <?= is_select('Komputer', $data['kategori']); ?> value="Komputer">Komputer</option>
                <option <?= is_select('Elektronik', $data['kategori']); ?> value="Elektronik">Elektronik</option>
                <option <?= is_select('Hand Phone', $data['kategori']); ?> value="Hand Phone">Hand Phone</option>
            </select>
        </div>
        <div>
            <label>Harga Jual</label><br>
            <input type="text" name="harga_jual" value="<?= e((string) $data['harga_jual']); ?>" required>
        </div>
        <div>
            <label>Harga Beli</label><br>
            <input type="text" name="harga_beli" value="<?= e((string) $data['harga_beli']); ?>" required>
        </div>
        <div>
            <label>Stok</label><br>
            <input type="text" name="stok" value="<?= e((string) $data['stok']); ?>" required>
        </div>
        <div>
            <label>File Gambar</label><br>
            <input type="file" name="file_gambar">
        </div>
        <div>
            <input type="hidden" name="id" value="<?= (int) $data['id_barang']; ?>">
            <button type="submit">Simpan</button>
        </div>
    </form>
</section>
