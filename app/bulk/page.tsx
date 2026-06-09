export default function BulkPage() {
  return (
    <>
      {/* Header */}
      <div style={{ paddingTop: 160, paddingBottom: 80, backgroundColor: "var(--charcoal)", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
            Bulk & Corporate Gifting
          </p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "var(--cream)", marginBottom: 20, lineHeight: 1.1 }}>
            Gift the art of
            <br />
            slow living.
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontStyle: "italic", color: "rgba(255,250,244,0.5)", maxWidth: 500, margin: "0 auto" }}>
            Curated gifting solutions for clients, teams, and every occasion that matters.
          </p>
        </div>
      </div>

      {/* What we offer */}
      <section style={{ padding: "100px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow">What We Offer</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 40 }}>
            {[
              { title: "Premium Tea Collections", desc: "Curated selections from our full range, presented in beautiful, sustainable packaging worthy of the recipient." },
              { title: "Sustainable Accessories", desc: "Handpicked pieces — from chai glasses to serving trays — that carry the Eternal mark of quiet intention." },
              { title: "Custom Gifting Experiences", desc: "We work with you to create bespoke combinations, branded gifting sets, and personalised notes for every occasion." },
            ].map((item) => (
              <div key={item.title} style={{ padding: "48px 40px", border: "1px solid var(--mist)" }}>
                <div style={{ width: 32, height: 1, backgroundColor: "var(--gold)", marginBottom: 28 }} />
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, fontWeight: 400, color: "var(--charcoal)", marginBottom: 16, lineHeight: 1.2 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--charcoal)", opacity: 0.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section style={{ padding: "80px 0", backgroundColor: "#F5EDE0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow">Occasions We Serve</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
            {["Client Gifting", "Team Appreciation", "Diwali & Festive", "Weddings & Ceremonies", "Product Launches", "Year-End Gifting", "Welcome Kits", "Board Meetings"].map((occ) => (
              <span
                key={occ}
                style={{
                  padding: "10px 20px",
                  border: "1px solid var(--charcoal)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--charcoal)",
                }}
              >
                {occ}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section style={{ padding: "100px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Get in Touch</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, color: "var(--charcoal)", marginBottom: 48, textAlign: "center" }}>
            Tell us about your occasion.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            {[["Name", "text", "Your full name"], ["Organisation", "text", "Company or brand name"]].map(([label, type, placeholder]) => (
              <div key={label as string}>
                <label style={{ display: "block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{label}</label>
                <input
                  type={type as string}
                  placeholder={placeholder as string}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--mist)",
                    backgroundColor: "transparent",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13,
                    color: "var(--charcoal)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Email</label>
            <input
              type="email"
              placeholder="hello@yourcompany.com"
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid var(--mist)",
                backgroundColor: "transparent",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                color: "var(--charcoal)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Message</label>
            <textarea
              rows={5}
              placeholder="Tell us about your requirements — occasion, quantities, any customisation needs..."
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid var(--mist)",
                backgroundColor: "transparent",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                color: "var(--charcoal)",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button className="btn-primary" style={{ width: "100%", textAlign: "center" }}>
            Send Enquiry
          </button>
        </div>
      </section>
    </>
  );
}
