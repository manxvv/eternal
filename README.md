# Eternal — Next.js Website

**The Art of Slow Luxury** — Curated teas, artisanal coffee, and sustainable drinkware.

## Brand Colors
- `#FFFAF4` — Cream (background)
- `#565448` — Charcoal (primary text, footer)
- `#C4A882` — Gold (accents, eyebrows)
- `#E8DDD0` — Mist (borders, dividers)
- `#F5EDE0` — Warm Sand (section backgrounds)

## Typography
- **Display:** Cormorant Garamond (Google Fonts) — headings, hero, product names
- **Body:** DM Sans (Google Fonts) — navigation, body text, labels

## Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Marquee, Philosophy, Tea, Flower Teas, Coffee, Accessories, Bulk CTA |
| `/tea` | Full tea collection with tasting notes |
| `/coffee` | Coffee collection + brew guide |
| `/accessories` | Sustainable accessories grid |
| `/bulk` | Corporate gifting enquiry + form |
| `/team` | Team profiles |
| `/contact` | Contact form |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom CSS variables
- **Fonts:** Google Fonts (Cormorant Garamond + DM Sans)
- **TypeScript:** Strict mode enabled

## Notes
- Forms are UI-only; connect to your preferred backend (Resend, Formspree, etc.)
- Placeholder product images use CSS/SVG — replace with real photography
- The animated marquee and hero effects use pure CSS animations (no external libs)
