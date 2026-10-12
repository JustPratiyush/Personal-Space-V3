// The live site exposes GET /api/location -> { city, updatedAt, source }.
// Only the response shape was observed; how the owner updates it server-side
// is not visible from the client. This version reads environment variables,
// e.g. CURRENT_CITY="Lisbon" CURRENT_CITY_UPDATED_AT="2026-10-01T00:00:00Z".
export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }

  const city = process.env.CURRENT_CITY;
  // No city set: About keeps its fallback. 204 keeps the browser console quiet.
  if (!city) return res.status(204).end();

  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  return res.status(200).json({
    city,
    updatedAt: process.env.CURRENT_CITY_UPDATED_AT ?? new Date().toISOString(),
    source: "env",
  });
}
