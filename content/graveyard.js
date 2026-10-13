// My Projects Graveyard. Dates are first commit to last.
// TODO(Abhinav): sign off on the epitaphs. VastuVistar may have been client work; drop it if so.

const repo = (name) => `https://github.com/JustPratiyush/${name}`;

export const graveyard = {
  title: "projects graveyard",
  intro:
    "Here lie the side projects, cohort homework and half-ideas that taught me something, then quietly stopped getting commits. Pay your respects.",
  graves: [
    { name: "AI Medical Assistant", by: "28 Mar 2025 – 28 Mar 2025", note: "Diagnosed everyone. Couldn't diagnose itself.", href: repo("AI-Powered-Medical-Assistant") },
    { name: "Old Personal Website", by: "10 Apr 2025 – 15 Aug 2025", note: "Replaced by a better-looking sibling. Then that one got replaced too.", href: repo("Old_Personal_Website") },
    { name: "Tinder but for Dogs", by: "19 Apr 2025 – 19 Apr 2025", note: "Swiped left by the market. Good boys deserved better.", href: repo("Tinder_but_for_Dogs") },
    { name: "VastuVistar", by: "17 May 2025 – 09 Jun 2025", note: "Faced every right direction. Still got archived.", href: repo("VastuVistar_Website") },
    { name: "ProgressLens", by: "15 Nov 2025 – 15 Nov 2025", note: "Tracked everyone's progress but its own.", href: repo("ProgressLens") },
    { name: "PaperPulse", by: "11 Dec 2025 – 11 Dec 2025", note: "No pulse detected.", href: repo("PaperPulse") },
    { name: "Mockup Singer Website", by: "06 Feb 2026 – 06 Feb 2026", note: "Never got its record deal.", href: repo("mockup-singer-website") },
    { name: "Stand-up Comedy Template", by: "06 Feb 2026 – 06 Feb 2026", note: "Bombed. Tough crowd.", href: repo("standup-comedy-website-template") },
    { name: "PracticeOS", by: "08 Aug 2026 – 17 Aug 2026", note: "Built to make me practice. I didn't.", href: repo("PracticeOS") },
  ],
  footer: { label: "Visit the full cemetery on GitHub", href: "https://github.com/JustPratiyush?tab=repositories" },
};
