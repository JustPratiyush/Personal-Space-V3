// Values taken from the production bundle (styled-components ThemeProvider in
// _app, which ships with the light theme active: white text on black).
export const colors = {
  text: "white",
  background: "#000000",
  barBackground: "#101012",
  live: "#f45b5b", // location dot
  panel: "rgba(10, 10, 12, 0.78)",
  panelBorder: "rgba(255, 255, 255, 0.09)",
  rule: "rgba(255, 255, 255, 0.15)",
  linkUnderline: "rgba(255, 255, 255, 0.45)",
  card: "#faf9f5", // hover-preview card
  cardText: "#111",
};

export const font = `VCR, monospace`;

// Type scale, taken from Essays and shared by Work, Taste, Press and the
// graveyard: section headline, item title, body text, small meta lines.
export const type = {
  headline: "32px",
  title: "clamp(18px, 2vw, 22px)",
  text: "14px",
  meta: "12px",
};
