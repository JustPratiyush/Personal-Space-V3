// Work: filter tabs over rows ({ group, name, by, note?, href? }). The GitHub
// heatmap and the featured project open their group's tab, above the rows.
// Items with an `instagram` permalink show the post embedded instead of a row.

const YOUCHOOSE_STORE = "https://chromewebstore.google.com/detail/youchoose/cfcegcgfmmgihngficddaoglpfopjnka";
const FOLLOW_CHECK_STORE = "https://chromewebstore.google.com/detail/follow-check-for-instagra/mackbnaialfjcopijdbkpgabkofafmon";

export const work = {
  // Followed by a link to the graveyard.
  intro: "Things I've built, mostly for the browser. The ones that didn't make it are in the",
  githubUser: "JustPratiyush",
  heatmapGroup: "shipped",

  featured: {
    group: "shipped",
    name: "Retrium OS",
    meta: "Aug 2025 – now · Browser OS · RPG · Vanilla JS",
    image: "/images/retrium.webp",
    imageAlt: "Retrium OS: a pixel-art retro desktop with a welcome window, desktop icons and a dock",
    body: [
      "A retro operating system in your browser that slowly turns into a role-playing game. Log in as Dash, dig through the Finder, Terminal, Messages and Journal, and find out what's hidden in the machine.",
      "It started as my portfolio. I designed the pixel-art icons, the UI and the story, and wrote it in plain HTML, CSS and JavaScript. The guestbook runs on Upstash Redis.",
    ],
    stats: [
      { value: "128K", label: "launch reel views" },
      { value: "1,500+", label: "visitors" },
      { value: "0", label: "frameworks" },
    ],
    links: [
      { label: "Play it", href: "https://retrium.vercel.app" },
      { label: "Watch the reel", href: "https://www.instagram.com/heyyabhinavkuchhal/reel/DbicaGsv5XM/" },
    ],
  },

  groups: ["shipped", "freelance", "reels", "tools"],
  items: [
    {
      group: "shipped",
      name: "YouChoose",
      by: "2026 · Chrome Web Store",
      note: "YouTube, my way: blocks Shorts, shows dislikes, filters channels, summarises any video in ChatGPT or Claude.",
      href: YOUCHOOSE_STORE,
    },
    {
      group: "shipped",
      name: "Follow Check for Instagram",
      by: "2026 · Chrome Web Store",
      note: "See who doesn't follow you back, from your logged-in tab. No password, nothing stored.",
      href: FOLLOW_CHECK_STORE,
    },
    {
      group: "shipped",
      name: "Video Summariser",
      by: "2026 · GitHub",
      note: "A YouTube transcript lands in ChatGPT or Claude with a detailed summary prompt. Now lives inside YouChoose.",
      href: "https://github.com/JustPratiyush/youtube-video-summarizer-extension",
    },
    {
      group: "shipped",
      name: "Flappy Bird AI",
      by: "2025 · Live",
      note: "10,000 neural-network birds learn the game at once through a genetic algorithm.",
      href: "https://ai-flappy-bird.vercel.app/",
    },
    {
      group: "shipped",
      name: "Sub-Stash",
      by: "2026 · Live",
      note: "Tracks subscriptions and recurring bank deductions before they surprise you.",
      href: "https://sub-stash.vercel.app/",
    },

    {
      group: "freelance",
      name: "AesthetiQ",
      by: "Summer 2026 · Subcontract",
      note: "Built the marketplace and a custom AI inventory dashboard for a TamiraLife product. Supabase, Anthropic API, Vercel.",
      href: "https://aesthatiq.com/",
    },

    // TODO(Abhinav): add view counts.
    {
      group: "reels",
      name: "Introducing Retrium OS",
      by: "02 Aug 2026 · 128K views",
      instagram: "https://www.instagram.com/reel/DbicaGsv5XM/",
    },
    { group: "reels", name: "How I made Retrium OS", by: "12 Sep 2026", instagram: "https://www.instagram.com/reel/DdLaDD-PtYf/" },
    { group: "reels", name: "Follow Check for Instagram", by: "03 Oct 2026", instagram: "https://www.instagram.com/reel/DeBpztjPDPW/" },

    // TODO(Abhinav): edit the one-liners so they're how you'd say it.
    { group: "tools", name: "Claude Code", by: "Daily", note: "My pair programmer." },
    { group: "tools", name: "Codex", by: "Daily", note: "A second pair of hands." },
    { group: "tools", name: "Anthropic API", by: "AI", note: "The AI inside AesthetiQ's inventory dashboard." },
    { group: "tools", name: "Figma", by: "Design", note: "Where interfaces start, before any code." },
    { group: "tools", name: "Adobe Photoshop", by: "Design", note: "Images and graphics." },
    { group: "tools", name: "Adobe Premiere Pro", by: "Video", note: "Where the reels get edited." },
    { group: "tools", name: "Supabase", by: "Backend", note: "Database and auth for Sub-Stash and AesthetiQ." },
    { group: "tools", name: "Upstash Redis", by: "Backend", note: "Retrium's guestbook." },
    { group: "tools", name: "Vercel", by: "Hosting", note: "Where everything ships, including this site." },
  ],
};
