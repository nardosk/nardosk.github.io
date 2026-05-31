// Generates the social share card (public/og.png, 1200x630) from the brand fonts.
// One-time/asset generation — run with `node scripts/og-card.mjs` after a design tweak.
// The committed PNG is the artifact; this is not part of the build.
import { readFileSync } from "node:fs";
import sharp from "sharp";

const b64 = (p) => readFileSync(p).toString("base64");
const tight = b64("public/fonts/inter-tight-900-latin.woff2");
const serif = b64("public/fonts/instrument-serif-italic-latin.woff2");

// Brand palette (light "cream" theme), approximated from styles.css oklch values.
const CREAM = "#F1ECE3";
const INK = "#211F1B";
const MUTED = "#6F6A61";
const HAIR = "#211F1B"; // hairline, used at low opacity

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <style>
    @font-face{font-family:'Inter Tight';font-weight:900;font-style:normal;src:url(data:font/woff2;base64,${tight}) format('woff2');}
    @font-face{font-family:'Instrument Serif';font-weight:400;font-style:italic;src:url(data:font/woff2;base64,${serif}) format('woff2');}
    .label{font-family:'Inter Tight',sans-serif;font-weight:900;fill:${MUTED};letter-spacing:6px;font-size:20px;}
    .display{font-family:'Inter Tight',sans-serif;font-weight:900;fill:${INK};letter-spacing:-6px;}
    .serif{font-family:'Instrument Serif',serif;font-style:italic;fill:${MUTED};}
  </style>

  <rect width="1200" height="630" fill="${CREAM}"/>

  <!-- top hairline + eyebrow row -->
  <line x1="80" y1="118" x2="1120" y2="118" stroke="${HAIR}" stroke-opacity="0.14" stroke-width="1"/>
  <text x="80" y="96" class="label">PORTFOLIO</text>
  <text x="1120" y="96" class="label" text-anchor="end">NARDOS.ET</text>

  <!-- name -->
  <text x="76" y="360" class="display" font-size="190">Nardos K.</text>

  <!-- serif tagline -->
  <text x="80" y="450" class="serif" font-size="56">Software engineer in Addis Ababa.</text>

  <!-- bottom hairline + footer row -->
  <line x1="80" y1="540" x2="1120" y2="540" stroke="${HAIR}" stroke-opacity="0.14" stroke-width="1"/>
  <text x="80" y="582" class="label">DESKTOP &amp; WEB APPLICATION DEVELOPMENT</text>
  <text x="1120" y="582" class="label" text-anchor="end">ET</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("public/og.png");
console.log("wrote public/og.png");
