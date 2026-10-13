// Work: filter tabs over items ({ group, name, by, ... }). Items with an `image`,
// an `icon` or an `instagram` permalink show as showcase rows: text on the left
// (a `note` or `body` paragraphs, optional `stats`, `links`), the screenshot,
// icon or post on the right. A post's `poster` is a picture of its embed that
// shows until the live one loads. Other items are compact rows ({ note?, href? }).
// The GitHub heatmap and the intro open the `heatmapGroup` tab.

const YOUCHOOSE_STORE = "https://chromewebstore.google.com/detail/youchoose/cfcegcgfmmgihngficddaoglpfopjnka";
const FOLLOW_CHECK_STORE = "https://chromewebstore.google.com/detail/follow-check-for-instagra/mackbnaialfjcopijdbkpgabkofafmon";
const github = (repo) => `https://github.com/JustPratiyush/${repo}`;
const reelPoster = (code) => ({ src: `/images/instagram/${code}.webp`, width: 348, height: 643 });

export const work = {
  // Under the GitHub heatmap, followed by a link to the graveyard.
  intro: "Things I've built, mostly for the browser. The ones that didn't make it are in the",
  githubUser: "JustPratiyush",
  heatmapGroup: "shipped",

  groups: ["shipped", "freelance", "reels", "tools"],
  items: [
    {
      group: "shipped",
      name: "Retrium OS",
      by: "Aug 2025 – now · Browser OS · RPG · Vanilla JS",
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
      image: "/images/retrium.webp",
      imageAlt: "Retrium OS: a pixel-art retro desktop with a welcome window, desktop icons and a dock",
    },
    {
      group: "shipped",
      name: "YouChoose",
      by: "2026 · Chrome extension",
      note: "YouTube, my way: blocks Shorts, shows dislikes, filters channels, summarises any video in ChatGPT or Claude.",
      links: [
        { label: "Chrome Web Store", href: YOUCHOOSE_STORE },
        { label: "GitHub", href: github("YouChoose") },
      ],
      icon: "/images/icons/youchoose.webp",
    },
    {
      group: "shipped",
      name: "Follow Check for Instagram",
      by: "2026 · Chrome extension",
      note: "See who doesn't follow you back, from your logged-in tab. No password, nothing stored.",
      links: [
        { label: "Chrome Web Store", href: FOLLOW_CHECK_STORE },
        { label: "GitHub", href: github("instagram-followers-check-extension") },
      ],
      icon: "/images/icons/follow-check.webp",
    },
    {
      group: "shipped",
      name: "Flappy Bird AI",
      by: "2025 · Browser game",
      note: "10,000 neural-network birds learn the game at once through a genetic algorithm.",
      links: [
        { label: "Play it", href: "https://ai-flappy-bird.vercel.app/" },
        { label: "GitHub", href: github("Flappy_Bird_-Genetic-Algorithm-") },
      ],
      image: "/images/flappy-bird-ai.webp",
      imageAlt: "Flappy Bird AI mid-training: a flock of birds, the evolution controls and a live neural network",
    },
    {
      group: "shipped",
      name: "Sub-Stash",
      by: "2026 · Web app",
      note: "Tracks subscriptions and recurring bank deductions before they surprise you.",
      links: [
        { label: "Live site", href: "https://sub-stash.vercel.app/" },
        { label: "GitHub", href: github("sub-stash") },
      ],
      image: "/images/sub-stash.webp",
      imageAlt: "Sub-Stash's dashboard: this month's subscription bill, upcoming renewals and recent payments",
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
      poster: reelPoster("DbicaGsv5XM"),
    },
    {
      group: "reels",
      name: "How I made Retrium OS",
      by: "12 Sep 2026",
      instagram: "https://www.instagram.com/reel/DdLaDD-PtYf/",
      poster: reelPoster("DdLaDD-PtYf"),
    },
    {
      group: "reels",
      name: "Follow Check for Instagram",
      by: "03 Oct 2026",
      instagram: "https://www.instagram.com/reel/DeBpztjPDPW/",
      poster: reelPoster("DeBpztjPDPW"),
    },

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
