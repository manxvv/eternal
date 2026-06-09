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
      router.push("/tea"); // Redirect to shop
    } else {
      setError("An account with this email already exists.");
    }
  };

  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center p-6 lg:p-20">
      {/* ── REGISTER CARD ── */}
      <div className="w-full max-w-[480px] bg-white border border-brand-blue/5 p-10 lg:p-16 shadow-xl shadow-brand-blue/5 animate-fade-in">
        
        {/* Logo & Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <img 
              src="/Eternal logo corp2-01.png" 
              alt="Eternal" 
              className="h-12 w-auto mx-auto" 
            />
          </Link>
          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
            Join the Atelier
          </p>
          <h1 className="font-cormorant text-4xl text-brand-blue">
            Create Account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. Julianne Smith"
              required
              className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors placeholder:text-brand-blue/20"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@eternaltea.in"
              required
              className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors placeholder:text-brand-blue/20"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors placeholder:text-brand-blue/20"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-800 text-[11px] px-4 py-3 font-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 px-4 bg-brand-blue text-brand-gold font-dmsans text-[11px] uppercase tracking-[0.2em] font-bold transition-all
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/10"}
            `}
          >
            {loading ? "Establishing Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-12 text-center pt-8 border-t border-brand-blue/5">
          <p className="text-xs text-brand-blue/50 font-dmsans">
            Already a member?{" "}
            <Link 
              href="/login" 
              className="text-brand-blue font-bold border-b border-brand-gold hover:text-brand-gold transition-colors pb-0.5 ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}