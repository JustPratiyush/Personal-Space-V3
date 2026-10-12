// Work: one featured project, then filter tabs over rows ({ group, name, by, note?, href? }).

const YOUCHOOSE_STORE = "https://chromewebstore.google.com/detail/youchoose/cfcegcgfmmgihngficddaoglpfopjnka";
const FOLLOW_CHECK_STORE = "https://chromewebstore.google.com/detail/follow-check-for-instagra/mackbnaialfjcopijdbkpgabkofafmon";

export const work = {
  // Followed by a link to the graveyard.
  intro: "Things I've built, mostly for the browser. The ones that didn't make it are in the",
  githubUser: "JustPratiyush",

  featured: {
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

    // TODO(Abhinav): confirm what each reel is about and add view counts.
    {
      group: "reels",
      name: "“Check the pinned comment for the link”",
      by: "03 Oct 2026",
      note: "The Follow Check for Instagram launch",
      href: "https://www.instagram.com/reel/DeBpztjPDPW/",
    },
    { group: "reels", name: "“Something is coming up”", by: "12 Sep 2026", note: "A teaser", href: "https://www.instagram.com/heyyabhinavkuchhal/reel/DdLaDD-PtYf/" },
    { group: "reels", name: "“A quick introduction”", by: "26 Aug 2026", note: "Who I am and what I build", href: "https://www.instagram.com/heyyabhinavkuchhal/reel/Dch7WGAMUim/" },
    {
      group: "reels",
      name: "“Thanks to everyone who appreciated my project”",
      by: "12 Aug 2026",
      note: "Retrium OS, the follow-up",
      href: "https://www.instagram.com/heyyabhinavkuchhal/reel/Db8E2tqPLDa/",
    },
    {
      group: "reels",
      name: "“I spent way too long building this fun project”",
      by: "02 Aug 2026 · 128K views",
      note: "The Retrium OS launch",
      href: "https://www.instagram.com/heyyabhinavkuchhal/reel/DbicaGsv5XM/",
    },

    // TODO(Abhinav): edit the one-liners so they're how you'd say it.
    { group: "tools", name: "Claude Code", by: "Daily", note: "My pair programmer." },
    { group: "tools", name: "Codex", by: "Daily", note: "A second pair of hands." },
    { group: "tools", name: "Anthropic API", by: "AI", note: "The AI inside AesthetiQ's inventory dashboard." },
    { group: "tools", name: "Figma", by: "Design", note: "Where interfaces start, before any code." },
    { group: "tools", name: "Supabase", by: "Backend", note: "Database and auth for Sub-Stash and AesthetiQ." },
    { group: "tools", name: "Upstash Redis", by: "Backend", note: "Retrium's guestbook." },
    { group: "tools", name: "Vercel", by: "Hosting", note: "Where everything ships, including this site." },
    { group: "tools", name: "YouChoose", by: "Made by me", note: "YouTube without Shorts or the rabbit holes.", href: YOUCHOOSE_STORE },
    { group: "tools", name: "Follow Check", by: "Made by me", note: "Keeps my Instagram following honest.", href: FOLLOW_CHECK_STORE },
    {
      group: "tools",
      name: "Video Summariser",
      by: "Made by me",
      note: "Long videos into ChatGPT or Claude, in one paste.",
      href: "https://github.com/JustPratiyush/youtube-video-summarizer-extension",
    },
  ],
};
