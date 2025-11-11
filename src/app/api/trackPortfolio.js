import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolioDB");

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const timestamp = new Date();

    await db.collection("visits").insertOne({
      ip,
      userAgent,
      page: "portfolio",
      timestamp,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error tracking visit:", error);
    res.status(500).json({ success: false });
  }
}
