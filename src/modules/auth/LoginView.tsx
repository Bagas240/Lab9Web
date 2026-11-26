"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LoginView() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        router.push("/index.php?page=user/list");
        router.refresh();
      } else {
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <p>
        Gunakan akun: <strong>admin</strong> / <strong>admin123</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <br />
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input type="password" name="password" required />
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            Login
          </button>
        </div>
      </form>
    </section>
  );
}
