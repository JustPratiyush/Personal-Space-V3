// Content for Press, Essays and Taste.

// Press: quote cards ("coverage") plus an optional Instagram post embed.
export const press = {
  title: "press",
  coverage: [
    {
      outlet: "First India",
      meta: "Feb 2025 · Maharana Kika: The Battles Within",
      quote: "Stellar act by Pratyush as Jagmal.",
      attribution: "Photo caption in “Saga of Valour” by Divya Kanwaliya",
      // TODO(Abhinav): check the history line and the joke.
      body: "A review of Brajwasi Productions' historical drama about Maharana Pratap, which premiered at the Rajasthan International Centre in Jaipur. I played Jagmal, the half-brother who lost the throne and went over to Akbar. They spelled my name Pratyush. I'll take it.",
      url: "https://www.instagram.com/p/DGP-vE0va14/",
    },
  ],
  // The play post: Jagmal in costume, and the First India clipping in the carousel.
  instagramPermalink: "https://www.instagram.com/p/DGP-vE0va14/",
};

export const essays = {
  blurb: "I write about what I'm building and what I'm figuring out.",
  // TODO(Abhinav): point this at the Cupertino Focus post once it's on Substack.
  lead: {
    title: "Cupertino Focus",
    note: "In first year, a group of us started a design agency out of a PG far from campus. We designed an \"Uber with guns\" months before a US startup raised millions for the same idea. What that taught me about execution.",
    href: "https://abhinavkuchhal.substack.com",
  },
  items: [],
  footer: { label: "More essays & life updates on Substack", href: "https://abhinavkuchhal.substack.com" },
};

// ---------------------------------------------------------------------------
// Taste: filter tabs over grouped references. A row is { group, name, by, note?, href? }.

const book = (name, by, note) => ({ group: "books", name, by, note });

// From the Notion "My Books Collection" (kuchhal.notion.site), spellings fixed.
const books = [
  book("Steve Jobs", "Walter Isaacson", "Reading now"),
  book("Never Finished", "David Goggins", "Reading now"),
  book("Can't Hurt Me", "David Goggins"),
  book("Hyperfocus", "Chris Bailey"),
  book("Living with a SEAL", "Jesse Itzler"),
  book("Dopamine Nation", "Anna Lembke"),
  book("Cracking the Code", "Ayushmann Khurrana"),
  book("Eat That Frog!", "Brian Tracy"),
  book("Rich Dad Poor Dad", "Robert T. Kiyosaki"),
  book("How to Win Friends and Influence People", "Dale Carnegie"),
  book("Chanakya Neeti", "Radhakrishnan Pillai"),
  book("The 48 Laws of Power", "Robert Greene"),
  book("The Miracle Morning", "Hal Elrod"),
  book("Men Are from Mars, Women Are from Venus", "John Gray"),
  book("Atomic Habits", "James Clear"),
  book("The Almanack of Naval Ravikant", "Eric Jorgenson"),
  book("Immortal Talks, Book 1", "Shunya"),
  book("Immortal Talks, Book 2", "Shunya"),
  book("Swara Yoga", "Swami Muktibodhananda"),
  book("Thanos: Titan Consumed", "Barry Lyga"),
  book("Lessons Life Taught Me, Unknowingly", "Anupam Kher"),
  book("Tools of Titans", "Tim Ferriss"),
  book("The Personal MBA", "Josh Kaufman"),
  book("The Way of the Superior Man", "David Deida"),
  book("Inner Engineering", "Sadhguru"),
  book("Youth and Truth", "Sadhguru"),
  book("Mystic's Musings", "Sadhguru"),
  book("Adiyogi: The Source of Yoga", "Sadhguru"),
  book("Midnights with the Mystic", "Cheryl Simone"),
  book("Death: An Inside Story", "Sadhguru"),
  book("Karma: A Yogi's Guide to Crafting Your Destiny", "Sadhguru"),
  book("Journey to the Center of the Earth", "Jules Verne"),
  book("The Adventures of Tintin", "Herge"),
  book("Elon Musk", "Walter Isaacson", "Up next"),
  book("Butter", "Asako Yuzuki", "Up next"),
  book("The Courage to Be Disliked", "Ichiro Kishimi & Fumitake Koga", "Gave up"),
  book("The Power of Habit", "Charles Duhigg", "Gave up"),
  book("The Rudest Book Ever", "Shwetabh Gangwar", "Gave up"),
  book("Attitude Is Everything", "Jeff Keller", "Gave up"),
  book("Flow", "Mihaly Csikszentmihalyi", "Gave up"),
  book("The Miracle Equation", "Hal Elrod", "Gave up"),
  book("Irrfan: A Life in Movies", "Aseem Chhabra", "Gave up"),
  book("The Psychology of Money", "Morgan Housel", "Gave up"),
];

export const taste = {
  // TODO(Abhinav): make the second line yours. What are you usually thinking about?
  intro: [
    "Things that changed how I think. I keep coming back to these.",
    "Lately I'm thinking about agency, how the brain learns, and how tiny teams ship things that feel huge.",
  ],
  groups: ["essays", "writers and blogs", "books", "tweets", "rabbit holes"],
  references: [
    { group: "essays", name: "How to Be Successful", by: "Sam Altman", href: "https://blog.samaltman.com/how-to-be-successful" },
    { group: "essays", name: "Advice for High Schoolers", by: "Paul Graham", href: "https://paulgraham.com/hs.html" },
    { group: "essays", name: "High Agency in 30 Minutes", by: "George Mack", href: "https://www.highagency.com/" },
    { group: "essays", name: "The Adults Don't Exist", by: "George Mack", href: "https://essays.highagency.com/p/adults-dont-exist" },
    { group: "essays", name: "You Are Not Dumb, You Just Lack the Prerequisites", by: "Lelouch", href: "https://lelouch.dev/blog/you-are-probably-not-dumb/" },
    { group: "essays", name: "What Is First Principles Thinking?", by: "Farnam Street", href: "https://fs.blog/first-principles/" },
    {
      group: "essays",
      name: "7 Lessons on Excellence from Elon Musk's Biography",
      by: "Books Are Our Superpower",
      href: "https://medium.com/books-are-our-superpower/7-surprising-lessons-ive-learned-about-excellence-reading-elon-musk-s-biography-e5120ab91ba1",
    },

    { group: "writers and blogs", name: "Paul Graham", by: "Essays", href: "https://paulgraham.com/articles.html" },
    { group: "writers and blogs", name: "Sam Altman", by: "Blog", href: "https://blog.samaltman.com/" },
    { group: "writers and blogs", name: "George Mack", by: "High Agency", href: "https://www.highagency.com/" },
    { group: "writers and blogs", name: "Farnam Street", by: "fs.blog", href: "https://fs.blog/" },
    { group: "writers and blogs", name: "Sadhguru", by: "Articles", href: "https://isha.sadhguru.org/en/wisdom/type/article" },

    ...books,

    { group: "tweets", name: "Agency > Intelligence", by: "Andrej Karpathy", href: "https://x.com/karpathy/status/1894099637218545984" },

    {
      group: "rabbit holes",
      name: "India: 1899–1947, on film",
      by: "BFI · YouTube playlist",
      href: "https://www.youtube.com/playlist?list=PLXvkgGofjDzi-fROZSBN3p-CKeaZIc-Ue",
    },
    { group: "rabbit holes", name: "Isha Yoga", by: "Isha Foundation", href: "https://isha.sadhguru.org/" },
    {
      group: "rabbit holes",
      name: "Patanjali Yoga Sutras",
      by: "The Sanskrit Channel · YouTube",
      href: "https://www.youtube.com/playlist?list=PLAPrVB8wngPnXpf5OhUqYgE_i6JlhtL8a",
    },
    { group: "rabbit holes", name: "Blueprint, the protocol", by: "Bryan Johnson", href: "https://protocol.bryanjohnson.com/" },
  ],
  // Optional collapsible list under the grid ({ title, items: [{ icon, topic, title, href }] }).
  collection: null,
};
