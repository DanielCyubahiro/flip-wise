import dbConnect from "@/config/database";
import Cards from "@/config/models/Card";

export default async function handler(request, response) {
  try {
    await dbConnect();
    if (request.method === "GET") {
      const cards = await Cards.find().populate("collectionId");
      console.log(cards);

      return response.status(200).json(cards);
    }
    if (request.method === "POST") {
      const cardData = request.body;
      console.log(cardData);
      const newCard = await Cards.create(cardData);
      return response.status(201).json(newCard);
    }

    return response.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return response.status(500).json({ error: error.message });
  }
}
