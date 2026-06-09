export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div style={{ paddingTop: 160, paddingBottom: 80, backgroundColor: "var(--charcoal)", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
            Contact
          </p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "var(--cream)", marginBottom: 20 }}>
            Let's talk.
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontStyle: "italic", color: "rgba(255,250,244,0.5)" }}>
            For collaborations, gifting enquiries, retail partnerships, and customer support.
          </p>
        </div>
      </div>

      <section style={{ padding: "100px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          {/* Left — info */}
          <div>
            <p className="eyebrow">Get in Touch</p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, color: "var(--charcoal)", marginBottom: 40, lineHeight: 1.2 }}>
              We read every message.
            </h2>

            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Email</p>
              <a href="mailto:hello@eternaltea.in" style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, color: "var(--charcoal)", textDecoration: "none" }}>
                hello@eternaltea.in
              </a>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid var(--mist)", marginBottom: 40 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {[
                { topic: "Customer Support", note: "Order queries, product guidance" },
                { topic: "Bulk & Corporate", note: "Gifting programs, custom sets" },
                { topic: "Retail Partnerships", note: "Stockist & wholesale enquiries" },
                { topic: "Collaborations", note: "Brands, events, editorial" },
              ].map((item) => (
                <div key={item.topic}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 17, color: "var(--charcoal)", marginBottom: 4 }}>{item.topic}</p>
                  <p style={{ fontSize: 12, color: "var(--charcoal)", opacity: 0.5 }}>{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Name</label>
              <input
                type="text"
                placeholder="Your name"
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
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
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
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Subject</label>
              <select
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid var(--mist)",
                  backgroundColor: "var(--cream)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  color: "var(--charcoal)",
                  outline: "none",
                  boxSizing: "border-box",
                  appearance: "none",
                }}
              >
                <option value="">Select a topic</option>
                <option>Customer Support</option>
                <option>Bulk & Corporate Gifting</option>
                <option>Retail Partnership</option>
                <option>Collaboration</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Message</label>
              <textarea
                rows={6}
                placeholder="Tell us how we can help..."
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
            <button className="btn-primary" style={{ width: "100%" }}>
              Send Message
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
