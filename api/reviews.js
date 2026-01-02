import { getDb, getReviewsCollectionName } from "./_mongo.js";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { ok: false, error: "Method Not Allowed" });
  }

  try {
    const db = await getDb();
    const reviews = db.collection(getReviewsCollectionName());

    const limit = Math.min(50, Math.max(1, Number(req.query?.limit || 20)));

    const items = await reviews
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray();

    return json(res, 200, { ok: true, reviews: items });
  } catch (e) {
    return json(res, 500, { ok: false, error: e?.message || "Server error" });
  }
}
