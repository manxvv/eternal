import Link from "next/link";
import Image from "next/image";

const teas = [
  { name: "Everyday Assam Tea", desc: "Begin each morning with this bold, malty companion. Sourced from Assam's finest estates, it pairs beautifully with milk or enjoyed plain.", note: "Best served: With whole milk", image: "/everyday_assam_tea.jpeg" },
  { name: "Majestic Assam Tea", desc: "Rich and full-bodied, from single-garden estates. A tea for moments that deserve a touch of ceremony.", note: "Best served: Black, steeped 4 min", image: "/majestic_assam_tea.jpeg" },
  { name: "Heritage Masala Tea", desc: "A warming blend of hand-selected spices — cardamom, ginger, cinnamon — woven into a traditional black tea base.", note: "Best served: With full cream milk", image: null },
  { name: "Rose Reverie", desc: "Delicate rose petals softened by a fine Darjeeling base. A tea for quiet afternoons and gentle reflection.", note: "Best served: Light, no milk", image: null },
  { name: "Lemongrass Estate", desc: "Citrus-bright and naturally soothing. Fresh lemongrass from the Nilgiris blended with a clean green base.", note: "Best served: Hot or cold-brewed", image: null },
];

const flowerTeas = [
  { name: "Blue Empress", desc: "A rare and visually stunning infusion from butterfly pea flowers. Vivid indigo in the cup, naturally caffeine-free.", note: "Add lemon to watch it turn pink" },
  { name: "Hibiscus Blossom", desc: "Vivid, tart, and deeply floral. Hibiscus flowers dried at their peak, bursting with colour and character.", note: "Best served: Chilled, with honey" },
];

export default function TeaPage() {
  return (
    <>
      {/* Header */}
      <div style={{ paddingTop: 160, paddingBottom: 80, backgroundColor: "#F5EDE0", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Our Collections</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 300, color: "var(--charcoal)", letterSpacing: "-0.01em", marginBottom: 20 }}>
            Teas
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontStyle: "italic", color: "var(--charcoal)", opacity: 0.65 }}>
            From everyday indulgence to refined experiences.
          </p>
        </div>
      </div>

      {/* Featured teas with real images */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow">Featured Teas</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 32 }}>
            {teas.filter(t => t.image).map((tea) => (
              <div key={tea.name} style={{ position: "relative", overflow: "hidden" }} className="img-zoom">
                <div style={{ position: "relative", aspectRatio: "4/3" }}>
                  <Image src={tea.image!} alt={tea.name} fill style={{ objectFit: "cover" }} sizes="50vw" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(86,84,72,0.8) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, padding: "32px 36px" }}>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, fontWeight: 300, color: "var(--cream)", marginBottom: 8, lineHeight: 1.2 }}>
                      {tea.name}
                    </p>
                    <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", fontStyle: "italic" }}>
                      {tea.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tea list */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow">Single Estate & Blended Teas</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 1, border: "1px solid var(--mist)", marginTop: 32 }}>
            {teas.map((tea, i) => (
              <div
                key={tea.name}
                style={{ padding: "40px 36px", borderRight: "1px solid var(--mist)", borderBottom: "1px solid var(--mist)", backgroundColor: "var(--cream)", transition: "background-color 0.3s", cursor: "pointer" }}
              >
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase" }}>
                  0{i + 1}
                </span>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, fontWeight: 400, color: "var(--charcoal)", margin: "12px 0 12px", lineHeight: 1.2 }}>
                  {tea.name}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--charcoal)", opacity: 0.6, marginBottom: 20 }}>{tea.desc}</p>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>{tea.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flower teas */}
      <section id="flower" style={{ padding: "80px 0", backgroundColor: "var(--charcoal)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Flower Teas</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "var(--cream)", marginBottom: 60 }}>
            Delicate infusions inspired by nature.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {flowerTeas.map((tea) => (
              <div key={tea.name} style={{ padding: "48px 40px", border: "1px solid rgba(255,250,244,0.12)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, borderRadius: "50%", backgroundColor: tea.name === "Blue Empress" ? "rgba(130,160,220,0.12)" : "rgba(220,100,120,0.12)", transform: "translate(30%, -30%)" }} />
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, fontWeight: 300, color: "var(--cream)", marginBottom: 16 }}>{tea.name}</p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,250,244,0.55)", marginBottom: 24 }}>{tea.desc}</p>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", fontStyle: "italic" }}>{tea.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--cream)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, color: "var(--charcoal)", marginBottom: 20 }}>
            Ready to order?
          </h2>
          <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.6, lineHeight: 1.8, marginBottom: 36 }}>
            Browse all available teas and accessories in our store.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products" className="btn-primary">Shop All Products</Link>
            <Link href="/bulk" className="btn-gold">Enquire About Gifting</Link>
          </div>
        </div>
      </section>
    </>
  );
}
