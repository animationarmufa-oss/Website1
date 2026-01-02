import { getDb, getOrdersCollectionName, getReviewsCollectionName } from "./_mongo.js";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function safeStr(v, maxLen = 500) {
  const s = String(v ?? "").trim();
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, error: "Method Not Allowed" });
  }

  try {
    const { orderId, username, rating, comment } = req.body || {};

    const orderIdSafe = safeStr(orderId, 80);
    const usernameSafe = safeStr(username, 60);
    const commentSafe = safeStr(comment, 800);
    const ratingNum = Number(rating);

    if (!orderIdSafe) return json(res, 400, { ok: false, error: "orderId wajib" });
    if (!usernameSafe) return json(res, 400, { ok: false, error: "username wajib" });
    if (!Number.isFinite(ratingNum) || ratingNum < 1 || ratingNum > 6) {
      return json(res, 400, { ok: false, error: "rating harus 1-6" });
    }
    if (!commentSafe) return json(res, 400, { ok: false, error: "ulasan wajib" });

    const db = await getDb();
    const orders = db.collection(getOrdersCollectionName());
    const reviews = db.collection(getReviewsCollectionName());

    const order = await orders.findOne({ order_id: orderIdSafe });
    if (!order) {
      // Keep it strict: only allow reviews for known orders.
      return json(res, 404, { ok: false, error: "Order tidak ditemukan" });
    }

    // Basic anti-spam: 1 review per order.
    const existing = await reviews.findOne({ orderId: orderIdSafe });
    if (existing) {
      return json(res, 409, { ok: false, error: "Ulasan untuk order ini sudah ada" });
    }

    const now = new Date();
    const verified = String(order.status || "").toLowerCase() === "paid";

    const doc = {
      orderId: orderIdSafe,
      username: usernameSafe,
      rating: ratingNum,
      comment: commentSafe,
      productKey: safeStr(order.productKey, 40),
      planKey: safeStr(order.planKey, 40),
      amount: order.price ?? order.amount ?? null,
      verified,
      created_at: now,
    };

    await reviews.insertOne(doc);

    return json(res, 200, { ok: true, review: { ...doc, _id: undefined } });
  } catch (e) {
    return json(res, 500, { ok: false, error: e?.message || "Server error" });
  }
}
