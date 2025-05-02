import dbConnect from "@/config/database";
import Cards from "@/config/models/Card";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const cardsInOneCollection = await Cards.find({
        collectionId: id,
      }).populate("collectionId");
      console.log(cardsInOneCollection);
      response.status(200).json(cardsInOneCollection);
      return;
    } catch (err) {
      response.status(500).json({ status: "Failed to fetch cards." });
      return;
    }
  }
  res.status(405).json({ message: "Method Not Allowed" });
}
