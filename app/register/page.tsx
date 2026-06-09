"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const ok = await register(name, email, password);
    setLoading(false);
    if (ok) {
      router.push("/products");
    } else {
      setError("An account with this email already exists.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid var(--mist)",
    backgroundColor: "transparent",
    fontFamily: "var(--font-dm-sans)",
    fontSize: 13,
    color: "var(--charcoal)",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-dm-sans)",
    fontSize: 9,
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    color: "var(--charcoal)",
    opacity: 0.6,
    marginBottom: 8,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5EDE0",
        padding: "100px 40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          backgroundColor: "var(--cream)",
          border: "1px solid var(--mist)",
          padding: "56px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Link href="/">
            <img src="/Eternal logo corp2-01.png" alt="Eternal" style={{ height: 48, marginBottom: 32, display: "inline-block" }} />
          </Link>
          <p className="eyebrow" style={{ textAlign: "center" }}>Join Eternal</p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 36,
              fontWeight: 300,
              color: "var(--charcoal)",
              margin: 0,
            }}
          >
            Create Account
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                color: "#B05050",
                marginBottom: 20,
                padding: "12px 16px",
                backgroundColor: "rgba(176,80,80,0.06)",
                border: "1px solid rgba(176,80,80,0.2)",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              border: "1px solid var(--charcoal)",
              backgroundColor: "var(--charcoal)",
              color: "var(--cream)",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.3s",
            }}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <hr style={{ border: "none", borderTop: "1px solid var(--mist)", marginBottom: 24 }} />
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--charcoal)", opacity: 0.6 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--charcoal)", opacity: 1, textDecoration: "underline", textUnderlineOffset: 3 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
