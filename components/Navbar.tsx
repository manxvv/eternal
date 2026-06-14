"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tea", href: "/tea" },
  { label: "Coffee", href: "/coffee" },
  { label: "Accessories", href: "/accessories" },
  { label: "Bulk Buying", href: "/bulk" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // FIX: Added mounted state
  const pathname = usePathname();

  // Zustand Stores
  const { user, logout, isAuthenticated } = useAuthStore();
  const { items } = useCartStore();
  
  // Calculate total items in cart
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Handle mounting, scroll, and menu body-lock
  useEffect(() => {
    setMounted(true); // FIX: Confirming component is mounted on client
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-white/95 backdrop-blur-md shadow-sm border-b border-brandBlue/5" 
          : "py-6 bg-white"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between relative">
        
        {/* Brand Logo - Left */}
        <Link href="/" className="z-[110]">
          <h1 className="font-serif text-2xl tracking-[0.15em] text-brandBlue uppercase">
            Eternal
          </h1>
        </Link>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`font-sans text-[11px] uppercase tracking-[0.25em] transition-colors font-medium ${
                pathname === link.href ? "text-brandGold" : "text-brandBlue hover:text-brandGold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Icons & Auth */}
        <div className="flex items-center gap-6 z-[110]">
          
          {/* Admin Link - Mounted check for safety */}
          {mounted && user?.isAdmin && (
            <Link 
              href="/admin" 
              className="hidden md:block font-sans text-[10px] uppercase tracking-widest text-brandGold border border-brandGold/30 px-3 py-1 hover:bg-brandGold hover:text-black transition-all"
            >
              Dashboard
            </Link>
          )}

          {/* Cart Icon */}
          <Link href="/cart" className="relative group text-brandBlue hover:text-brandGold transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {/* FIX: Only show count after mounting */}
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brandGold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-sans animate-in fade-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Section - FIX: Mounted check prevents Hydration error */}
          <div className="hidden md:flex items-center border-l border-brandBlue/10 pl-6 ml-2 min-w-[80px] justify-end">
            {!mounted ? (
               <div className="h-4 w-12 bg-brandBlue/5 animate-pulse rounded" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brandBlue">
                  {user?.name?.split(" ")[0]}
                </span>
                <button 
                  onClick={() => logout()} 
                  className="text-[10px] uppercase tracking-widest text-brandBlue/40 hover:text-brandBlue transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="text-[10px] uppercase tracking-widest text-brandBlue font-bold border-b border-brandGold/60 hover:border-brandGold transition-all pb-0.5"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="lg:hidden text-brandBlue"
            aria-label="Toggle Menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-brandBlue transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-brandBlue transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-brandBlue transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 w-full h-screen bg-brandCream z-[90] flex flex-col justify-center px-12 space-y-8 transition-transform duration-700 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            onClick={() => setMenuOpen(false)} 
            className="block font-serif text-5xl text-brandBlue hover:text-brandGold transition-colors"
          >
            {link.label}
          </Link>
        ))}
        
        <div className="pt-12 border-t border-brandBlue/10 flex flex-col gap-8">
          <Link 
            href="/cart" 
            onClick={() => setMenuOpen(false)} 
            className="font-sans text-xs uppercase tracking-[0.2em] text-brandBlue flex justify-between items-center"
          >
            Your Selection 
            {mounted && <span className="text-brandGold font-bold">({totalItems})</span>}
          </Link>
          
          {mounted && (
            isAuthenticated ? (
              <button 
                onClick={() => { logout(); setMenuOpen(false); }} 
                className="text-left font-sans text-xs uppercase tracking-[0.2em] text-brandGold font-bold"
              >
                Sign Out ({user?.name})
              </button>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setMenuOpen(false)} 
                className="font-sans text-xs uppercase tracking-[0.2em] text-brandGold font-bold"
              >
                Member Login
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}