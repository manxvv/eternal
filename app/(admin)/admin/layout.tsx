"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuthStore(); // 2. Destructure logout function


  // Close sidebar automatically when user clicks a link (on mobile)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Products", href: "/admin/products" },
    { name: "Orders", href: "/admin/orders" },
    // { name: "Orders", href: "/admin/orders" },
  ];

  return (
    <div className="flex min-h-screen bg-brand-cream relative">
      
      {/* ── MOBILE OVERLAY ── */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-brand-blue/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-brand-blue text-white flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <img src="/Eternal logo corp2-01.png" alt="Eternal" className="h-8 w-auto mb-2 invert" />
            <p className="text-[10px] text-brand-gold tracking-[0.2em] font-bold uppercase">Admin Portal</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-brand-gold">✕</button>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`block px-4 py-3 text-[11px] uppercase tracking-widest font-bold transition-colors hover:text-brand-gold ${
                pathname === item.href ? "text-brand-gold bg-white/5" : "text-white/70"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="p-6 border-t border-white/5 space-y-4">
          <Link href="/" className="block text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            View Site ↗
          </Link>
          {/* Logout in Sidebar */}
          <button 
            onClick={logout}
            className="block w-full text-left text-[10px] uppercase tracking-widest text-red-400 font-bold hover:text-red-300 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-brand-blue/5 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-brand-blue">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10h14M3 5h14M3 15h14" />
              </svg>
            </button>
            <h2 className="font-cormorant text-xl lg:text-2xl text-brand-blue italic">Management Suite</h2>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
             <div className="hidden sm:block text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">Master Admin</p>
                {/* Small Logout Link in Header */}
                <button onClick={logout} className="text-[9px] uppercase tracking-tighter text-brand-gold hover:text-brand-blue transition-colors">
                  Logout
                </button>
             </div>
             <div className="h-9 w-9 rounded-full border border-brand-gold p-0.5">
                <div className="h-full w-full rounded-full bg-brand-blue flex items-center justify-center text-[11px] text-brand-gold font-bold">
                  A
                </div>
             </div>
          </div>
        </header>
        
        {/* PAGE CONTENT */}
        <div className="p-6 lg:p-10 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}