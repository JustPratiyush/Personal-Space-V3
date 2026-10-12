// Every route renders the same client-only <App>. The active section is derived
// from the URL, and navigating between sections is a client-side router.push.

export const Section = {
  about: "about",
  work: "work",
  essays: "essays",
  taste: "taste",
  press: "press",
  graveyard: "graveyard",
};

// Order of the side navigation.
export const NAV_SECTIONS = [
  Section.about,
  Section.work,
  Section.essays,
  Section.taste,
  Section.press,
  Section.graveyard,
];

// What the navigation shows for each section (defaults to the section name).
export const NAV_LABELS = {
  [Section.graveyard]: "† graveyard",
};

// Browser-tab titles.
export const SECTION_TITLES = {
  [Section.about]: "Abhinav Kuchhal",
  [Section.work]: "Work · Abhinav Kuchhal",
  [Section.essays]: "Essays · Abhinav Kuchhal",
  [Section.taste]: "Taste · Abhinav Kuchhal",
  [Section.press]: "Press · Abhinav Kuchhal",
  [Section.graveyard]: "Projects Graveyard · Abhinav Kuchhal",
};

const PATH_TO_SECTION = {
  "/about": Section.about,
  "/work": Section.work,
  "/essays": Section.essays,
  "/taste": Section.taste,
  "/press": Section.press,
  "/graveyard": Section.graveyard,
};

// Unknown paths (including /colophon and the catch-all route) fall back to About.
export function sectionFromPath(asPath) {
  const path = asPath.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  return PATH_TO_SECTION[path] ?? Section.about;
}

export function pathForSection(section) {
  return `/${section in Section ? section : Section.about}`;
}
