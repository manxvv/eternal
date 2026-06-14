"use client";

import { useState } from "react";
import Link from "next/link";
import { useRegister } from "@/hooks/useAuth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ name, email, password });
  };

  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center p-6 lg:p-20">
      <div className="w-full max-w-[480px] bg-white border border-brand-blue/5 p-10 lg:p-16 shadow-2xl animate-fade-in">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <img src="/Eternal logo corp2-01.png" alt="Eternal" className="h-12 w-auto mx-auto" />
          </Link>
          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Join the Atelier</p>
          <h1 className="font-cormorant text-4xl text-brand-blue">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-brand-blue/60 tracking-widest">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Julianne Smith"
              required
              className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-sm outline-none focus:border-brand-gold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-brand-blue/60 tracking-widest">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@eternaltea.in"
              required
              className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-sm outline-none focus:border-brand-gold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-brand-blue/60 tracking-widest">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-sm outline-none focus:border-brand-gold"
            />
          </div>

          {registerMutation.isError && (
            <div className="bg-red-50 border border-red-100 text-red-800 text-[11px] px-4 py-3">
              {(registerMutation.error as any)?.response?.data?.message || "Registration failed. Try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className={`w-full py-5 px-4 bg-brand-blue text-brand-gold text-[11px] uppercase tracking-[0.2em] font-bold transition-all
              ${registerMutation.isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90 hover:shadow-lg"}
            `}
          >
            {registerMutation.isPending ? "Establishing Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-brand-blue/5 text-xs">
          Already a member? <Link href="/login" className="text-brand-blue font-bold border-b border-brand-gold ml-1">Sign In</Link>
        </div>
      </div>
    </main>
  );
}