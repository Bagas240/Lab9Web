<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aplikasi PHP Modular</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="container">
    <header>
        <h1>Aplikasi PHP Modular</h1>
        <p>Contoh pemisahan template dan konten</p>
    </header>
    <nav>
        <?php $currentPage = is_string($page ?? null) ? $page : 'dashboard'; ?>
        <a href="index.php?page=dashboard" class="<?= isActiveMenu($currentPage, 'dashboard'); ?>">Dashboard</a>
        <a href="index.php?page=user/list" class="<?= isActiveMenu($currentPage, 'user/list'); ?>">Data Barang</a>
        <a href="index.php?page=user/add" class="<?= isActiveMenu($currentPage, 'user/add'); ?>">Tambah Barang</a>
        <?php if (isLoggedIn()): ?>
            <a href="index.php?page=auth/logout" class="<?= isActiveMenu($currentPage, 'auth/logout'); ?>">Logout (<?= e((string) $_SESSION['user']); ?>)</a>
        <?php else: ?>
            <a href="index.php?page=auth/login" class="<?= isActiveMenu($currentPage, 'auth/login'); ?>">Login</a>
        <?php endif; ?>
    </nav>
    <main>
