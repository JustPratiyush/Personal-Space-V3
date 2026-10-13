// A year of GitHub contributions, from a public mirror of the calendar.
export const contributionsUrl = (user) => `https://github-contributions-api.jogruber.de/v4/${user}?y=last`;

// For getStaticProps: the Work page ships with the year already in it. Null on
// any failure, and the heatmap fetches it in the browser instead.
export async function fetchContributions(user) {
  try {
    const res = await fetch(contributionsUrl(user), { signal: AbortSignal.timeout(10000) });
    const json = res.ok ? await res.json() : null;
    return json?.contributions?.length ? json : null;
  } catch {
    return null;
  }
}
