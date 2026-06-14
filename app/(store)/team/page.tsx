const team = [
  {
    name: "Priya Sharma",
    role: "Founder & Tea Curator",
    bio: "A decade spent traversing Assam, Darjeeling, and the Nilgiris — Priya's palate shapes every blend in the Eternal collection.",
    initials: "PS",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Coffee",
    bio: "Trained in specialty coffee in Coorg and Chikmagalur, Arjun brings precision and passion to every roast profile.",
    initials: "AM",
  },
  {
    name: "Kavita Nair",
    role: "Design & Accessories",
    bio: "A background in craft and material science means Kavita's accessory selections are both beautiful and built to last.",
    initials: "KN",
  },
  {
    name: "Rohan Das",
    role: "Partnerships & Gifting",
    bio: "Rohan has crafted gifting programs for over 200 corporate clients, creating meaningful moments at every scale.",
    initials: "RD",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Header */}
      <div style={{ paddingTop: 160, paddingBottom: 80, backgroundColor: "#F5EDE0", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Our Team</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "var(--charcoal)", marginBottom: 20 }}>
            The people behind
            <br />
            <em style={{ fontStyle: "italic" }}>Eternal.</em>
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontStyle: "italic", color: "var(--charcoal)", opacity: 0.6, maxWidth: 400, margin: "0 auto" }}>
            Meet the passion that shapes every collection.
          </p>
        </div>
      </div>

      {/* Team grid */}
      <section style={{ padding: "100px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
            {team.map((member) => (
              <div key={member.name} style={{ padding: "48px 40px", border: "1px solid var(--mist)", transition: "border-color 0.3s" }} className="product-card">
                {/* Avatar */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "1px solid var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 28,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, color: "var(--gold)" }}>{member.initials}</span>
                </div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, fontWeight: 400, color: "var(--charcoal)", marginBottom: 6 }}>
                  {member.name}
                </p>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
                  {member.role}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--charcoal)", opacity: 0.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--charcoal)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.6, marginBottom: 40 }}>
            "We are a small team with a singular obsession — creating moments that invite you to slow down, look up, and be present."
          </p>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)" }}>— The Eternal Team</p>
        </div>
      </section>
    </>
  );
}
