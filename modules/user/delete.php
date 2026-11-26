<!-- modules/user/delete.php -->
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    if ($id) {
        $stmt = mysqli_prepare($conn, 'DELETE FROM data_barang WHERE id_barang = ?');
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, 'i', $id);
            $ok = mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        } else {
            $ok = false;
        }

        if ($ok) {
            setFlash('success', 'Data barang berhasil dihapus.');
        } else {
            setFlash('error', 'Gagal menghapus data barang.');
        }
    } else {
        setFlash('error', 'ID barang tidak valid.');
    }
} else {
    setFlash('error', 'Penghapusan data harus menggunakan metode POST.');
}
header('Location: index.php?page=user/list');
exit;
?>
