<?php
// helpers/functions.php
function formatRupiah(float $angka): string {
    return 'Rp ' . number_format($angka, 0, ',', '.');
}

function e(string $nilai): string {
    return htmlspecialchars($nilai, ENT_QUOTES, 'UTF-8');
}

function hitungDiskon(float $harga, float $persen = 10): float {
    return $harga * ($persen / 100);
}

function validasiEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function ringkasTeks(string $teks, int $batas = 100): string {
    if (strlen($teks) <= $batas) {
        return $teks;
    }
    return substr($teks, 0, $batas) . '...';
}

function konversiCelciusKeFahrenheit(float $c): float {
    return ($c * 9 / 5) + 32;
}

function tentukanStatusNilai(float $nilai): string {
    if ($nilai >= 85) return 'Sangat Baik';
    if ($nilai >= 70) return 'Baik';
    if ($nilai >= 55) return 'Cukup';
    return 'Kurang';
}

function hitungTotal(float $harga, int $jumlah): float {
    return $harga * $jumlah;
}

function isActiveMenu(string $currentPage, string $targetPage): string {
    return $currentPage === $targetPage ? 'active' : '';
}

function setFlash(string $type, string $message): void {
    $_SESSION['flash'] = [
        'type' => $type,
        'message' => $message,
    ];
}

function displayFlash(): string {
    if (empty($_SESSION['flash']) || !is_array($_SESSION['flash'])) {
        return '';
    }
    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);
    $typeClass = ($flash['type'] ?? '') === 'success' ? 'alert-success' : 'alert-error';
    return '<div class="alert ' . $typeClass . '">' . e((string) ($flash['message'] ?? '')) . '</div>';
}

function isLoggedIn(): bool {
    return !empty($_SESSION['user']);
}
?>
