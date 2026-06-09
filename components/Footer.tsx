import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-brand-cream pt-24 pb-12">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <p className="font-cormorant text-3xl uppercase tracking-[0.3em]">Eternal</p>
            <p className="font-cormorant italic text-brand-gold text-lg">The Art of Slow Luxury</p>
            <p className="text-sm text-white/50 leading-relaxed max-w-[280px]">
              Every blend, every cup, and every accessory is chosen to create moments worth savouring.
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/60">
              Crafted in India
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-dmsans text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-8">Collections</h4>
            <ul className="space-y-4">
              {["Tea", "Flower Teas", "Coffee", "Accessories"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-[13px] text-white/60 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-dmsans text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-8">Philosophy</h4>
            <ul className="space-y-4">
              {[
                { label: "Our Story", href: "/#philosophy" },
                { label: "Meet the Team", href: "/team" },
                { label: "Bulk Buying", href: "/bulk" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[13px] text-white/60 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-dmsans text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-8">Inquiries</h4>
            <div className="space-y-4">
              <a href="mailto:hello@eternaltea.in" className="block text-[13px] text-white/60 hover:text-brand-gold transition-colors">
                hello@eternaltea.in
              </a>
              <p className="text-[12px] text-white/40 leading-relaxed">
                Available for boutique partnerships <br /> and global gifting sets.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-widest text-white/30 uppercase">
            © {new Date().getFullYear()} Eternal Atelier. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] tracking-widest text-white/30 uppercase">Privacy Policy</span>
            <span className="text-[10px] tracking-widest text-white/30 uppercase">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}