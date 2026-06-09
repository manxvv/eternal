import Link from "next/link";

const accessories = [
  { name: "Coffee Mugs", desc: "Hand-thrown ceramic mugs, glazed in muted earth tones. Holds warmth — in every sense.", material: "Ceramic" },
  { name: "Cutting Chai Glasses", desc: "The iconic tapered glass, refined. For that perfect two-inch pour of masala chai.", material: "Borosilicate Glass" },
  { name: "Tea Cups", desc: "Thin-walled porcelain cups that let you feel the warmth of the tea through your fingertips.", material: "Fine Porcelain" },
  { name: "Retro Cups", desc: "Inspired by India's roadside tapris — enamel-coated, familiar, and quietly charming.", material: "Enamel" },
  { name: "Sipper Glasses", desc: "For cold brews and iced teas. Clean lines, generous volume.", material: "Borosilicate Glass" },
  { name: "Bowls", desc: "Versatile, beautiful. For a pre-dawn matcha ritual or an evening herbal soak.", material: "Ceramic" },
  { name: "Serving Trays", desc: "Sustainably sourced wood with a minimalist profile. Elevates every pour.", material: "Mango Wood" },
];

export default function AccessoriesPage() {
  return (
    <>
      {/* Header */}
      <div style={{ paddingTop: 160, paddingBottom: 80, backgroundColor: "#F5EDE0", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Sustainable Accessories</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 300, color: "var(--charcoal)", marginBottom: 20 }}>
            Every piece, a ritual.
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontStyle: "italic", color: "var(--charcoal)", opacity: 0.6, maxWidth: 500, margin: "0 auto" }}>
            Thoughtfully designed pieces that elevate every sip.
          </p>
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding: "100px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {accessories.map((item, i) => (
              <div
                key={item.name}
                className="product-card"
                style={{
                  padding: "40px 32px",
                  backgroundColor: i % 4 === 0 ? "#F5EDE0" : "var(--cream)",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--gold)" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 400, color: "var(--charcoal)", marginBottom: 12, lineHeight: 1.2 }}>
                  {item.name}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--charcoal)", opacity: 0.6, marginBottom: 20 }}>{item.desc}</p>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>{item.material}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy note */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--charcoal)", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.5, marginBottom: 32 }}>
            "We design for the moment the cup touches your lips — not for the moment it touches a shelf."
          </p>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)" }}>— The Eternal Design Ethos</p>
        </div>
      </section>

      {/* Gifting CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "#F5EDE0", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, color: "var(--charcoal)", marginBottom: 20 }}>
            Create a custom gifting set.
          </h2>
          <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.65, lineHeight: 1.8, marginBottom: 36 }}>
            Mix and match teas with accessories for a bespoke gifting experience.
          </p>
          <Link href="/bulk" className="btn-primary">Enquire About Gifting</Link>
        </div>
      </section>
    </>
  );
}
