"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogin } from "@/hooks/useAuth"; // Import your new hook

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // TanStack Query hook handles loading, error, and navigation logic internally
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center p-6 lg:p-20">
      <div className="w-full max-w-[480px] bg-white border border-brand-blue/5 p-10 lg:p-16 shadow-2xl animate-fade-in">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <img src="/Eternal logo corp2-01.png" alt="Eternal" className="h-12 w-auto mx-auto" />
          </Link>
          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Welcome back to the Atelier</p>
          <h1 className="font-cormorant text-4xl text-brand-blue">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@eternaltea.in"
              required
              className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue text-sm outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">Password</label>
              <Link href="/forgot-password" className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">Forgot?</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue text-sm outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          {/* TanStack Query Error Handling */}
          {loginMutation.isError && (
            <div className="bg-red-50 border border-red-100 text-red-800 text-[11px] px-4 py-3 font-medium">
              {(loginMutation.error as any)?.response?.data?.message || "Invalid credentials. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={`w-full py-5 px-4 bg-brand-blue text-brand-gold text-[11px] uppercase tracking-[0.2em] font-bold transition-all
              ${loginMutation.isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90 hover:shadow-lg"}
            `}
          >
            {loginMutation.isPending ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-brand-blue/5">
          <p className="text-xs text-brand-blue/50">New to Eternal? <Link href="/register" className="text-brand-blue font-bold border-b border-brand-gold ml-1">Create an Account</Link></p>
        </div>
      </div>
    </main>
  );
}