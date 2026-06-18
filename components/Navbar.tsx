"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

const navLinks = [
  { label: "Home", href: "/" },
  { 
    label: "Services", 
    href: "#", 
    subLinks: [
      { label: "Tea", href: "/tea" },
      { label: "Coffee", href: "/coffee" },
      { label: "Accessories", href: "/accessories" },
    ] 
  },
  { label: "My Orders", href: "/myorders" },
  { label: "Bulk Buying", href: "/bulk" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // Dropdown state
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { user, logout, isAuthenticated } = useAuthStore();
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "py-2 bg-white backdrop-blur-md shadow-sm border-b border-brandBlue/5"
          : "py-4 bg-white"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="z-[110] shrink-0">
          <Image 
            src="/page1.png" 
            alt="Eternal Logo" 
            width={140} 
            height={50} 
            className="w-auto h-10 sm:h-20"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            link.subLinks ? (
              /* SERVICES DROPDOWN */
              <div 
                key={link.label}
                className="relative py-4"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-brandBlue hover:text-brandGold transition-colors">
                  {link.label}
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 w-48 bg-white shadow-xl border border-brandBlue/5 transition-all duration-300 ${servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brandBlue hover:bg-brandCream hover:text-brandGold border-b border-brandBlue/5 last:border-0"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[11px] font-bold uppercase tracking-[0.25em] transition-colors whitespace-nowrap ${
                  pathname === link.href ? "text-brandGold" : "text-brandBlue hover:text-brandGold"
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5 z-[110]">
          {mounted && user?.isAdmin && (
            <Link
              href="/admin"
              className="hidden md:block font-sans text-[10px] uppercase tracking-widest text-brandGold border border-brandGold/30 px-3 py-1 hover:bg-brandGold hover:text-black transition-all"
            >
              Dashboard
            </Link>
          )}

          {/* Cart */}
          <Link href="/cart" className="relative text-brandBlue hover:text-brandGold transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          <div className="hidden md:flex items-center border-l border-brandBlue/10 pl-4 min-w-[120px] justify-end">
            {!mounted ? (
              <div className="h-3 w-12 bg-brandBlue/5 animate-pulse rounded" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brandBlue truncate max-w-[70px]">
                  {user?.name.split(" ")[0]}
                </span>
                <button onClick={() => logout()} className="text-[10px] uppercase tracking-widest text-brandBlue/40 hover:text-brandBlue">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-[10px] uppercase tracking-widest text-brandBlue font-bold border-b border-brandGold/60 hover:border-brandGold transition-all pb-0.5">
                Sign In
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="xl:hidden text-brandBlue p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d={menuOpen ? "M18 6L6 18M6 6l12 12" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 w-full h-screen bg-white z-[999] flex flex-col justify-center px-8 transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.subLinks ? (
                <div className="space-y-4">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-brandGold font-bold">Collections</p>
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMenuOpen(false)}
                      className="block font-serif text-3xl text-brandBlue"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-4xl text-brandBlue"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-10 pt-8 border-t border-brandBlue/10 flex flex-col gap-6">
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="font-sans text-xs uppercase tracking-widest text-brandBlue flex justify-between items-center">
            Your Selection <span className="text-brandGold font-bold">({totalItems})</span>
          </Link>
          {mounted && (
            isAuthenticated ? (
              <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left font-sans text-xs uppercase tracking-widest text-brandGold font-bold">
                Sign Out — {user?.name}
              </button>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="font-sans text-xs uppercase tracking-widest text-brandGold font-bold">
                Member Login
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}