/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  // Links from the old portfolio keep working.
  async redirects() {
    return [
      // TODO: point at the Cupertino Focus post once it's on Substack.
      { source: "/writings/Cupertino-Focus", destination: "https://abhinavkuchhal.substack.com", permanent: false },
      { source: "/writings", destination: "/essays", permanent: true },
      { source: "/writings/:slug", destination: "/essays", permanent: true },
    ];
  },
};
