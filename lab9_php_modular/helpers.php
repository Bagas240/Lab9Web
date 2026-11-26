<?php
function formatRupiah(float $angka): string {
    return 'Rp ' . number_format($angka, 0, ',', '.');
}

function e(string $nilai): string {
    return htmlspecialchars($nilai, ENT_QUOTES, 'UTF-8');
}

function hitungDiskon(float $harga, float $persen = 10): float {
    return $harga * ($persen / 100);
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
?>
