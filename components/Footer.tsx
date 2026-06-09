import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--charcoal)",
        color: "var(--cream)",
        padding: "80px 0 40px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        {/* Top Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 80,
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: 28,
                fontWeight: 300,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Eternal
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: 16,
                fontStyle: "italic",
                color: "var(--gold)",
                marginBottom: 20,
                lineHeight: 1.6,
              }}
            >
              The Art of Slow Luxury
            </p>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.8,
                color: "rgba(255,250,244,0.6)",
                maxWidth: 280,
              }}
            >
              Every blend, every cup, and every accessory is chosen to create
              moments worth savouring.
            </p>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,250,244,0.4)",
                marginTop: 24,
              }}
            >
              Crafted in India
            </p>
          </div>

          {/* Collections */}
          <div>
            <p className="footer-heading">Collections</p>
            {["Tea", "Flower Teas", "Coffee", "Accessories"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="footer-link"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p className="footer-heading">Company</p>
            {[
              { label: "Our Philosophy", href: "/#philosophy" },
              { label: "Meet the Team", href: "/team" },
              { label: "Bulk & Corporate", href: "/bulk" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="footer-heading">Connect</p>
            <a href="mailto:hello@eternaltea.in" className="footer-link">
              hello@eternaltea.in
            </a>
            <Link href="/contact" className="footer-link">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,250,244,0.12)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,250,244,0.4)" }}>
            © {new Date().getFullYear()} Eternal. All rights reserved.
          </p>
          <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,250,244,0.4)" }}>
            Tea · Coffee · Accessories
          </p>
        </div>
      </div>

      <style>{`
        .footer-heading {
          font-family: var(--font-dm-sans);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
        }
        .footer-link {
          display: block;
          font-size: 13px;
          color: rgba(255,250,244,0.6);
          text-decoration: none;
          margin-bottom: 12px;
          transition: color 0.3s;
        }
        .footer-link:hover {
          color: var(--cream);
        }
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  );
}
