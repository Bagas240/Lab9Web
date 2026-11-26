<!-- modules/auth/login.php -->
<?php
if (isLoggedIn()) {
    header('Location: index.php?page=user/list');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === 'admin' && $password === 'admin123') {
        $_SESSION['user'] = $username;
        setFlash('success', 'Login berhasil. Selamat datang, ' . $username . '!');
        header('Location: index.php?page=user/list');
        exit;
    }

    setFlash('error', 'Username atau password salah.');
    header('Location: index.php?page=auth/login');
    exit;
}
?>
<section>
    <h2>Login</h2>
    <p>Gunakan akun: <strong>admin</strong> / <strong>admin123</strong></p>
    <form method="post" action="index.php?page=auth/login">
        <div>
            <label>Username</label><br>
            <input type="text" name="username" required>
        </div>
        <div>
            <label>Password</label><br>
            <input type="password" name="password" required>
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
    </form>
</section>
