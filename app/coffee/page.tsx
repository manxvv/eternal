import Link from "next/link";

const coffees = [
  {
    name: "Arabica Roast",
    roast: "Light–Medium",
    origin: "Single Origin",
    tasting: "Floral, stone fruit, bright acidity",
    desc: "A smooth, nuanced pour sourced from a single high-altitude origin. Bright, clean, and made to be savoured slowly.",
  },
  {
    name: "Champion Blend",
    roast: "Medium–Dark",
    origin: "Multi-Origin Blend",
    tasting: "Dark chocolate, walnut, long finish",
    desc: "Complex layers for the discerning palate. A masterfully balanced blend that rewards every sip with something new.",
  },
];

const brewNotes = [
  { method: "Pour Over", temp: "93°C", ratio: "1:15", time: "3–4 min" },
  { method: "French Press", temp: "95°C", ratio: "1:12", time: "4 min" },
  { method: "Moka Pot", temp: "90°C", ratio: "1:8", time: "5 min" },
  { method: "Cold Brew", temp: "Room temp", ratio: "1:8", time: "12–16 hr" },
];

export default function CoffeePage() {
  return (
    <>
      {/* Header */}
      <div style={{ paddingTop: 160, paddingBottom: 80, backgroundColor: "var(--charcoal)", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Our Collections</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 300, color: "var(--cream)", marginBottom: 20 }}>
            Coffee
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontStyle: "italic", color: "rgba(255,250,244,0.5)" }}>
            Crafted for unhurried mornings and meaningful conversations.
          </p>
        </div>
      </div>

      {/* Coffee cards */}
      <section style={{ padding: "100px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {coffees.map((coffee) => (
              <div
                key={coffee.name}
                style={{ border: "1px solid var(--mist)", padding: "52px 44px", transition: "border-color 0.3s" }}
                className="product-card"
              >
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 32, fontWeight: 300, color: "var(--charcoal)", marginBottom: 8 }}>
                  {coffee.name}
                </p>
                <div style={{ display: "flex", gap: 24, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--mist)" }}>
                  {[["Roast", coffee.roast], ["Origin", coffee.origin], ["Notes", coffee.tasting]].map(([label, value]) => (
                    <div key={label}>
                      <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>{label}</p>
                      <p style={{ fontSize: 12, color: "var(--charcoal)", opacity: 0.7 }}>{value}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--charcoal)", opacity: 0.65, marginBottom: 32 }}>{coffee.desc}</p>
                <Link href="/contact" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>
                  Enquire →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brew guide */}
      <section style={{ padding: "80px 0", backgroundColor: "#F5EDE0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow">Brew Guide</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, color: "var(--charcoal)", marginBottom: 48 }}>
            The ritual matters.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--mist)" }}>
            {brewNotes.map((note) => (
              <div key={note.method} style={{ padding: "36px 28px", borderRight: "1px solid var(--mist)" }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, color: "var(--charcoal)", marginBottom: 24 }}>{note.method}</p>
                {[["Temperature", note.temp], ["Ratio", note.ratio], ["Time", note.time]].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 13, color: "var(--charcoal)", opacity: 0.7 }}>{val}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
