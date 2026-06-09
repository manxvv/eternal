import Link from "next/link";

const teas = [
  { name: "Everyday Assam Tea", desc: "A bold, malty everyday companion.", category: "tea" },
  { name: "Majestic Assam Tea", desc: "Rich and full-bodied, from single estates.", category: "tea" },
  { name: "Heritage Masala Tea", desc: "A warming blend of hand-selected spices.", category: "tea" },
  { name: "Rose Reverie", desc: "Delicate petals, softened by fine Darjeeling.", category: "tea" },
  { name: "Lemongrass Estate", desc: "Citrus-bright, naturally soothing.", category: "tea" },
];

const flowerTeas = [
  { name: "Blue Empress", desc: "A rare blue infusion from butterfly pea flowers.", category: "flower" },
  { name: "Hibiscus Blossom", desc: "Vivid, tart, and deeply floral.", category: "flower" },
];

const coffees = [
  { name: "Arabica Roast", desc: "A smooth, nuanced single-origin pour.", category: "coffee" },
  { name: "Champion Blend", desc: "Complex layers for the discerning palate.", category: "coffee" },
];

const accessories = [
  "Coffee Mugs",
  "Cutting Chai Glasses",
  "Tea Cups",
  "Retro Cups",
  "Sipper Glasses",
  "Bowls",
  "Serving Trays",
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      {/* <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--cream)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "55%",
            background:
              "linear-gradient(to right, var(--cream) 0%, transparent 30%)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "55%",
            overflow: "hidden",
          }}
        >
          <img
            src="/majestic_assam_tea_product_banner.jpeg"
            alt="Majestic Assam Tea"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
            zIndex: 3,
            paddingTop: 120,
            paddingBottom: 80,
          }}
        >
          <div style={{ maxWidth: 580 }}>
            <p className="eyebrow animate-fade-up">Crafted in India · Est. 2024</p>

            <h1
              className="animate-fade-up-delay-1"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(56px, 8vw, 96px)",
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "var(--charcoal)",
                marginBottom: 32,
              }}
            >
              The Art of
              <br />
              <em style={{ fontStyle: "italic", color: "var(--deep)" }}>Slow Luxury</em>
            </h1>

            <p
              className="animate-fade-up-delay-2"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 16,
                lineHeight: 1.8,
                color: "var(--charcoal)",
                opacity: 0.75,
                maxWidth: 440,
                marginBottom: 48,
              }}
            >
              Curated teas, artisanal coffee, and sustainable drinkware for those
              who appreciate life's finer rituals.
            </p>

            <div className="animate-fade-up-delay-3" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/tea" className="btn-primary">
                Explore Teas
              </Link>
              <Link href="/accessories" className="btn-gold">
                View Accessories
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "center",
            fontFamily: "var(--font-dm-sans)",
            fontSize: 9,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--gold)",
            zIndex: 3,
          }}
        >
          Tea · Coffee · Accessories
        </div>
      </section> */}


         <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--cream)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background botanical SVG */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "55%",
            background:
              "linear-gradient(to right, var(--cream) 0%, transparent 30%)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "55%",
            backgroundColor: "#EDE5D8",
            overflow: "hidden",
          }}
        >
          {/* Marble texture overlay via SVG */}
          <svg
            viewBox="0 0 600 800"
            style={{ width: "100%", height: "100%", opacity: 0.4 }}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="marble">
                <feTurbulence type="turbulence" baseFrequency="0.015 0.008" numOctaves="6" seed="3" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
                <feBlend in="SourceGraphic" in2="gray" mode="multiply" />
              </filter>
            </defs>
            <rect width="600" height="800" fill="#D4C9B8" filter="url(#marble)" />
          </svg>

          {/* Decorative tea cup illustration */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 300 400" width="300" height="400" style={{ opacity: 0.25 }}>
              <g fill="none" stroke="#565448" strokeWidth="1">
                {/* Saucer */}
                <ellipse cx="150" cy="320" rx="90" ry="16" />
                <ellipse cx="150" cy="316" rx="70" ry="10" />
                {/* Cup body */}
                <path d="M90,220 Q85,310 120,315 L180,315 Q215,310 210,220 Z" />
                {/* Cup rim */}
                <ellipse cx="150" cy="220" rx="60" ry="12" />
                {/* Handle */}
                <path d="M210,240 Q250,240 250,270 Q250,300 210,295" />
                {/* Steam */}
                <path d="M130,190 Q125,160 130,130 Q135,100 130,70" strokeDasharray="4 6" />
                <path d="M150,195 Q145,165 150,135 Q155,105 150,75" strokeDasharray="4 6" />
                <path d="M170,190 Q165,160 170,130 Q175,100 170,70" strokeDasharray="4 6" />
                {/* Leaf decoration */}
                <path d="M60,150 Q80,100 120,130 Q80,140 60,150 Z" />
                <path d="M240,170 Q220,120 180,145 Q220,155 240,170 Z" />
              </g>
            </svg>
          </div>
        </div>

        {/* Hero content */}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
            zIndex: 3,
            paddingTop: 120,
            paddingBottom: 80,
          }}
        >
          <div style={{ maxWidth: 580 }}>
            <p className="eyebrow animate-fade-up">Crafted in India · Est. 2024</p>

            <h1
              className="animate-fade-up-delay-1"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(56px, 8vw, 96px)",
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "var(--charcoal)",
                marginBottom: 32,
              }}
            >
              The Art of
              <br />
              <em style={{ fontStyle: "italic", color: "var(--deep)" }}>Slow Luxury</em>
            </h1>

            <p
              className="animate-fade-up-delay-2"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 16,
                lineHeight: 1.8,
                color: "var(--charcoal)",
                opacity: 0.75,
                maxWidth: 440,
                marginBottom: 48,
              }}
            >
              Curated teas, artisanal coffee, and sustainable drinkware for those
              who appreciate life's finer rituals.
            </p>

            <div className="animate-fade-up-delay-3" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/tea" className="btn-primary">
                Explore Teas
              </Link>
              <Link href="/accessories" className="btn-gold">
                View Accessories
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical text */}
        <div
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "center",
            fontFamily: "var(--font-dm-sans)",
            fontSize: 9,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--gold)",
            zIndex: 3,
          }}
        >
          Tea · Coffee · Accessories
        </div>
      </section>``

      {/* ── MARQUEE ──────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--charcoal)",
          padding: "18px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 60,
            animation: "marquee 24s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...Array(4)].flatMap(() =>
            ["Everyday Assam", "Rose Reverie", "Blue Empress", "Arabica Roast", "Heritage Masala", "Champion Blend"].map(
              (item, i) => (
                <span
                  key={`${item}-${i}`}
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: 15,
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    fontStyle: i % 2 === 0 ? "italic" : "normal",
                  }}
                >
                  {item}
                  <span style={{ margin: "0 30px", color: "rgba(196,168,130,0.3)" }}>—</span>
                </span>
              )
            )
          )}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── PHILOSOPHY STRIP ─────────────────────────── */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "var(--cream)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>The Eternal Philosophy</p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 300,
              lineHeight: 1.3,
              color: "var(--charcoal)",
              marginBottom: 32,
            }}
          >
            Luxury is not excess.
            <br />
            <em style={{ fontStyle: "italic" }}>It is intention.</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 15,
              lineHeight: 1.9,
              color: "var(--charcoal)",
              opacity: 0.65,
            }}
          >
            Every blend, every cup, and every accessory is chosen to create moments worth savouring.
            We believe the finest things in life are those that invite you to slow down.
          </p>
        </div>
      </section>

      <hr className="divider" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* ── TEA COLLECTION ───────────────────────────── */}
      <section style={{ padding: "100px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 60,
            }}
          >
            <div>
              <p className="eyebrow">Our Collections</p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                }}
              >
                Teas
              </h2>
            </div>
            <Link href="/tea" className="nav-link">
              View all teas →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 24,
            }}
          >
            {teas.map((tea) => (
              <div key={tea.name} className="product-card" style={{ padding: 28, backgroundColor: "var(--cream)" }}>
                <div
                  style={{
                    width: 32,
                    height: 1,
                    backgroundColor: "var(--gold)",
                    marginBottom: 20,
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: 20,
                    fontWeight: 400,
                    color: "var(--charcoal)",
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {tea.name}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--charcoal)",
                    opacity: 0.55,
                    lineHeight: 1.6,
                  }}
                >
                  {tea.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOWER TEAS ──────────────────────────────── */}
      <section
        style={{
          padding: "80px 0",
          backgroundColor: "#F5EDE0",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
              <p className="eyebrow">Flower Teas</p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  marginBottom: 20,
                  lineHeight: 1.2,
                }}
              >
                Delicate infusions
                <br />
                inspired by nature.
              </h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "var(--charcoal)",
                  opacity: 0.65,
                  marginBottom: 36,
                }}
              >
                Each petal is a testament to nature's quiet artistry — steeped slowly to reveal colour, aroma, and flavour.
              </p>
              <Link href="/tea#flower" className="btn-primary">
                Discover Flower Teas
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {flowerTeas.map((tea) => (
                <div
                  key={tea.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    padding: "28px 32px",
                    backgroundColor: "var(--cream)",
                    border: "1px solid var(--mist)",
                    transition: "border-color 0.3s",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: tea.name === "Blue Empress" ? "#C5D8F0" : "#F0C0C0",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: 20,
                        fontWeight: 400,
                        color: "var(--charcoal)",
                        marginBottom: 4,
                      }}
                    >
                      {tea.name}
                    </p>
                    <p style={{ fontSize: 12, opacity: 0.55 }}>{tea.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COFFEE ───────────────────────────────────── */}
      <section style={{ padding: "100px 0", backgroundColor: "var(--charcoal)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 16,
              }}
            >
              Coffee
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 300,
                color: "var(--cream)",
                marginBottom: 16,
              }}
            >
              Crafted for unhurried mornings.
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,250,244,0.5)", maxWidth: 400, margin: "0 auto" }}>
              Roasted with intention. Brewed with care. For conversations that linger.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {coffees.map((coffee) => (
              <div
                key={coffee.name}
                style={{
                  padding: "48px 40px",
                  border: "1px solid rgba(255,250,244,0.12)",
                  transition: "border-color 0.3s",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: 26,
                    fontWeight: 300,
                    color: "var(--cream)",
                    marginBottom: 12,
                  }}
                >
                  {coffee.name}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,250,244,0.5)",
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}
                >
                  {coffee.desc}
                </p>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}
                >
                  Explore →
                </span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/coffee" className="btn-gold">
              View Coffee Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── ACCESSORIES ──────────────────────────────── */}
      <section style={{ padding: "100px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
              <p className="eyebrow">Sustainable Accessories</p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  marginBottom: 20,
                  lineHeight: 1.2,
                }}
              >
                Thoughtfully designed
                <br />
                pieces that elevate
                <br />
                every sip.
              </h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "var(--charcoal)",
                  opacity: 0.65,
                  marginBottom: 36,
                }}
              >
                From the weight of a cup to the curve of a serving tray — each piece is made to be used, cherished, and passed on.
              </p>
              <Link href="/accessories" className="btn-primary">
                View Accessories
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {accessories.map((item, i) => (
                <div
                  key={item}
                  style={{
                    padding: "20px 20px",
                    border: "1px solid var(--mist)",
                    backgroundColor: i % 3 === 0 ? "#F5EDE0" : "var(--cream)",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: 16,
                      color: "var(--charcoal)",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BULK & CORPORATE ─────────────────────────── */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "#F5EDE0",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Bulk & Corporate Gifting</p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 300,
              color: "var(--charcoal)",
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            Curated gifting solutions for every occasion.
          </h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: "var(--charcoal)",
              opacity: 0.65,
              marginBottom: 16,
            }}
          >
            Premium tea collections · Sustainable accessories · Custom gifting experiences
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: "var(--charcoal)",
              opacity: 0.65,
              marginBottom: 40,
            }}
          >
            For clients, teams, celebrations, and special occasions — we create gifting moments that reflect the values of your organisation.
          </p>
          <Link href="/bulk" className="btn-primary">
            Enquire Now
          </Link>
        </div>
      </section>
    </>
  );
}
