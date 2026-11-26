**Mata Kuliah** : Pemrograman Web
**Program Studi** : Teknik Informatika
**Nama** : Bagas Arya Ramadhan
**NIM** : _(312510328)_
**Kelas** : _(i251d)_

---

# Praktikum 9: PHP Modular (`Lab9Web`)


---

## Daftar Rute Aplikasi
Router utama di `index.php` membaca parameter `$_GET['page']` (default `'dashboard'`) dan mencocokkannya dengan array whitelist `$routes`:

| Parameter `page` | URL Rewrite (`.htaccess`) | File Modul / View | Status Akses | Keterangan |
|---|---|---|---|---|
| `dashboard` (default) | `/dashboard` | `views/dashboard.php` | Publik | Halaman beranda dan demo pemanggilan helper |
| `user/list` | `/user/list` | `modules/user/list.php` | Wajib Login | Menampilkan tabel `data_barang` |
| `user/add` | `/user/add` | `modules/user/add.php` | Wajib Login | Menambah data barang baru + upload gambar |
| `user/edit` | `/user/edit?id=1` | `modules/user/edit.php` | Wajib Login | Mengubah data barang berdasarkan `id_barang` |
| `user/delete` | `/user/delete` | `modules/user/delete.php` | Wajib Login (POST) | Menghapus data barang berdasarkan `id` POST |
| `auth/login` | `/auth/login` | `modules/auth/login.php` | Publik | Form login pengguna |
| `auth/logout` | `/auth/logout` | `modules/auth/logout.php` | Publik | Menghapus sesi login |
| Tidak ada di whitelist | `/admin/rahasia` | `views/404.php` | Publik (HTTP 404) | Halaman error 404 |

---

## Penjelasan Setiap Bagian & Langkah Praktikum

### Bagian 1: Pengujian `include` dan `require` (`lab9_php_modular/`)
- File `lab9_php_modular/pesan.php` mencetak teks sederhana, lalu dipanggil dari `lab9_php_modular/uji-include.php` menggunakan `include __DIR__ . '/pesan.php';`.
- Konstruksi **`include`** hanya menghasilkan *warning* jika file tidak ditemukan dan baris kode setelahnya (`Sesudah pemanggilan`) tetap dijalankan.
- Konstruksi **`require`** menghasilkan *fatal error* jika file tidak ditemukan sehingga eksekusi program langsung berhenti.
- Penggunaan konstanta **`__DIR__`** memastikan path file selalu dihitung dari direktori tempat file pemanggil berada, sehingga mencegah error path relatif.

### Bagian 2: Template Layout Multi-Halaman (`header.php`, `footer.php`, `style.css`)
- **`header.php`** memuat struktur pembuka HTML (`<!DOCTYPE html>`, `<head>`, tautan `style.css`), bagian `<header>` (*Aplikasi PHP Modular* / *Contoh pemisahan template dan konten*), menu `<nav>`, dan tag pembuka `<main>`.
- **`footer.php`** memuat penutup `</main>`, bagian `<footer>` dengan tahun otomatis `<?php echo date('Y'); ?>`, serta penutup `</body></html>`.
- Halaman `home.php`, `about.php`, `profil.php`, dan `kontak.php` memanggil keduanya menggunakan `require_once __DIR__ . '/header.php';` dan `require_once __DIR__ . '/footer.php';` sehingga tidak ada duplikasi markup layout di setiap halaman.
- **`style.css`** mengatur tampilan `.container` (`max-width: 960px`), warna latar `#f4f6f8`, header/footer `#eaf2f8`, tata letak navigasi `display: flex`, serta posisi footer di tengah.

### Bagian 3: Pemisahan Function ke File Helper (`helpers.php` & `helpers/functions.php`)
Seluruh function dipisahkan ke file helper dan dimuat menggunakan `require_once` agar tidak terjadi error *redeclare function*. Daftar function yang diimplementasikan:

| Nama Function | Parameter & Return | Kegunaan |
|---|---|---|
| `formatRupiah(float $angka): string` | Angka nominal -> teks `Rp ...` | Memformat angka harga menjadi format Rupiah |
| `e(string $nilai): string` | Teks mentah -> teks aman HTML | Melakukan *escaping* HTML (`htmlspecialchars`) untuk mencegah XSS |
| `hitungDiskon(float $harga, float $persen = 10): float` | Harga & persen (default `10`) -> nilai diskon | Menghitung nominal potongan harga |
| `validasiEmail(string $email): bool` | String email -> `true`/`false` | Memvalidasi format alamat email dengan `filter_var` |
| `ringkasTeks(string $teks, int $batas = 100): string` | Teks & batas panjang -> teks ringkas | Memotong teks panjang dan menambahkan `...` |
| `konversiCelciusKeFahrenheit(float $c): float` | Suhu Celcius -> suhu Fahrenheit | Konversi suhu untuk latihan function |
| `tentukanStatusNilai(float $nilai): string` | Nilai angka -> predikat | Mengembalikan predikat (`Sangat Baik`, `Baik`, `Cukup`, `Kurang`) |
| `hitungTotal(float $harga, int $jumlah): float` | Harga & jumlah -> total belanja | Mengalikan harga satuan dengan jumlah |

Function pada `helpers/functions.php` dipanggil ulang di minimal dua halaman berbeda, yaitu `views/dashboard.php` dan `modules/user/list.php` (serta `edit.php`).

### Bagian 4: Koneksi Database Modular (`config/database.php`)
- Konfigurasi koneksi database dari `koneksi.php` pada Praktikum 8 dipindahkan ke `config/database.php` dengan tetap mempertahankan ekstensi **MySQLi** (`localhost`, user `root`, database `latihan1`).
- File ini dimuat satu kali di `index.php` menggunakan `require_once __DIR__ . '/config/database.php';` sehingga variabel `$conn` tersedia untuk seluruh modul CRUD tanpa perlu menulis ulang koneksi.
- Jika koneksi gagal, detail error teknis dicatat ke `error_log()` dan pengguna hanya menerima pesan aman dengan status HTTP `500`.

### Bagian 5: Router dengan Whitelist dan Halaman 404 (`index.php` & `views/404.php`)
- `index.php` bertindak sebagai *front controller* (satu pintu masuk aplikasi).
- Parameter `$page = $_GET['page'] ?? 'dashboard';` divalidasi dengan `is_string($page)` dan `array_key_exists($page, $routes)`.
- Pendekatan **whitelist** ini mencegah celah keamanan *path traversal* (misalnya input `../../etc/passwd`) karena input URL tidak pernah digabung langsung menjadi path file.
- Jika nilai `page` kosong (`?page=`), berupa array (`?page[]=...`), atau tidak ada di `$routes`, server mengirim `http_response_code(404)` dan memuat `views/404.php`.

### Bagian 6: Integrasi CRUD `data_barang` (`modules/user/`)
Seluruh halaman CRUD dari Praktikum 8 dipindahkan ke `modules/user/` dan seluruh tautan diarahkan ke pola `index.php?page=...`:
- **`modules/user/list.php`**: Menjalankan `SELECT * FROM data_barang`, menampilkan gambar, nama barang (`ringkasTeks()`), kategori, harga beli & harga jual (`formatRupiah()`), diskon 10% (`hitungDiskon()`), stok, link `Ubah` (`index.php?page=user/edit&id=...`), dan tombol `Hapus` melalui form `POST` ke `index.php?page=user/delete`.
- **`modules/user/add.php`**: Memproses form `POST` dengan `enctype="multipart/form-data"`, menyimpan file gambar ke folder `gambar/`, dan menjalankan *prepared statement* `INSERT INTO data_barang`.
- **`modules/user/edit.php`**: Mengambil data lama berdasarkan `$_GET['id']`, mengisi nilai awal form, dan menjalankan *prepared statement* `UPDATE data_barang` saat disubmit (gambar lama dipertahankan jika tidak ada file baru yang diunggah).
- **`modules/user/delete.php`**: Memproses penghapusan hanya melalui metode `POST` menggunakan *prepared statement* `DELETE FROM data_barang WHERE id_barang = ?` (tidak menghapus lewat `GET`).

### Bagian 7: Implementasi Tantangan Mandiri
1. **Active Navigation (`isActiveMenu()`)**:
   - `helpers/functions.php` menyediakan `isActiveMenu($currentPage, $targetPage)` yang mengembalikan class `'active'` jika rute cocok.
   - `views/header.php` menerapkan class tersebut pada setiap tautan `<nav>`, dan `assets/css/style.css` menandai tautan aktif (`nav a.active`) dengan huruf tebal, garis bawah, dan latar `#eaf2f8`.
2. **Helper Pesan Sukses dan Gagal (`setFlash()` & `displayFlash()`)**:
   - `helpers/functions.php` menyediakan `setFlash($type, $message)` yang menyimpan notifikasi di `$_SESSION['flash']` dan `displayFlash()` yang menampilkannya sekali (`.alert-success` / `.alert-error`) lalu menghapusnya dari sesi.
   - Dipanggil pada setiap operasi Tambah, Ubah, Hapus, Login, Logout, dan penolakan akses.
3. **Pembatasan Akses (Autentikasi Sederhana)**:
   - `index.php` mengaktifkan `session_start()` dan mendefinisikan `$protectedRoutes = ['user/list', 'user/add', 'user/edit', 'user/delete'];`.
   - Helper `isLoggedIn()` memeriksa `$_SESSION['user']`. Jika pengguna belum login dan mencoba membuka modul terlindungi, router menyetel pesan flash error dan mengarahkan ke `index.php?page=auth/login`.
   - `modules/auth/login.php` memverifikasi akun (`admin` / `admin123`) dan `modules/auth/logout.php` menghapus `$_SESSION['user']`.
4. **URL Rewrite dengan `.htaccess` dan Konfigurasi Apache**:
   Isi file `.htaccess` di root project:
   ```apache
   # .htaccess di direktori project
   RewriteEngine On

   # Jika file atau direktori fisik tersedia, layani secara langsung
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d

   # Selain itu, arahkan ke router utama
   RewriteRule ^(.+)$ index.php?page=$1 [QSA,L]
   ```
   **Konfigurasi Apache yang diperlukan agar rewrite berjalan:**
   - Pastikan modul `mod_rewrite` aktif di file `httpd.conf` Apache (hapus tanda `#` pada `LoadModule rewrite_module modules/mod_rewrite.so`).
   - Pastikan `AllowOverride All` diaktifkan pada blok `<Directory>` docroot (misalnya `<Directory "C:/xampp/htdocs">`) agar Apache membaca file `.htaccess`.
   - Restart service Apache setelah perubahan konfigurasi.
   - `RewriteCond %{REQUEST_FILENAME} !-f` dan `!-d` memastikan permintaan file statis (seperti `assets/css/style.css`) atau folder fisik tetap dilayani langsung tanpa diarahkan ke `index.php`.

---

## 7. Kendala yang Ditemukan dan Cara Mengatasinya
| No | Kendala | Penyebab | Cara Mengatasi |
|---|---|---|---|
| 1 | `Failed opening required` saat memuat file dari subfolder | Path relatif berubah ketika file dipanggil melalui `index.php` atau dari dalam `modules/` | Menggunakan konstanta `__DIR__` saat menyusun path pada `require` dan `require_once` |
| 2 | `Function already declared` | File `helpers/functions.php` dipanggil berulang kali | Menggunakan `require_once` untuk memuat `helpers/functions.php` dan `config/database.php` |
| 3 | `Cannot modify header information - headers already sent` saat redirect CRUD/login | `views/header.php` sudah mencetak output HTML sebelum `header('Location: ...')` dijalankan di modul | Menambahkan `ob_start();` di awal `index.php` sebelum template `header.php` dimuat |
| 4 | CSS tidak tampil ketika membuka URL rewrite (`/user/list`) | Path relatif CSS bergeser mengikuti segmen URL | Menggunakan path aset yang konsisten dari root project (`assets/css/style.css`) |
| 5 | URL rewrite `.htaccess` menampilkan error 404 | `mod_rewrite` atau `AllowOverride All` pada Apache belum diaktifkan | Mengaktifkan `mod_rewrite` dan mengubah `AllowOverride None` menjadi `AllowOverride All` di `httpd.conf`, lalu restart Apache |
| 6 | Halaman selalu menampilkan `404 - Halaman tidak ditemukan` | Nilai parameter `page` belum terdaftar di array `$routes` atau terjadi salah penulisan | Menyamakan penulisan parameter `page` pada tautan dengan kunci pada `$routes` di `index.php` |

