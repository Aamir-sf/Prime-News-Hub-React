export default async function handler(req, res) {
  try {
    const {
      category = "general",
      country = "us",
      page = "1",
      pageSize = "8",
      searchQuery = ""
    } = req.query;

    const apiKey = process.env.NEWS_API_KEY; // Vercel env var (Step 4)
    if (!apiKey) {
      return res.status(500).json({ error: "NEWS_API_KEY is missing on server" });
    }

    const base = "https://newsapi.org/v2";
    const params = new URLSearchParams({
      apiKey,
      page: String(page),
      pageSize: String(pageSize)
    });

    let url = "";
    if (searchQuery && searchQuery.trim() !== "") {
      params.set("q", searchQuery);
      url = `${base}/everything?${params.toString()}`;
    } else {
      params.set("country", country);
      params.set("category", category);
      url = `${base}/top-headlines?${params.toString()}`;
    }

    const r = await fetch(url);
    const data = await r.json();

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=60");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
