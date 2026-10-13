import { work } from "../content/work";
import { fetchContributions } from "../lib/contributions";

export { default } from "./index";

// The heatmap's year is fetched at build time and refreshed hourly, so the
// page opens with it instead of waiting on the API.
export async function getStaticProps() {
  return { props: { contributions: await fetchContributions(work.githubUser) }, revalidate: 3600 };
}
