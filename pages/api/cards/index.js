import dbConnect from '@/config/database';
import Cards from '@/config/models/Card';

export default async function handler(request, response) {
  try {
    await dbConnect();
    if (request.method === 'GET') {
      const cards = await Cards.find().populate('collectionId');
      return response.status(200).json(cards);
    }
  } catch (error) {
    console.error('Failed to GET cards \nAPI Error:', error);
    return response.status(500).json({error: error.message});
  }

  try {
    if (request.method === 'POST') {
      const cardData = request.body;
      const newCard = await Cards.create(cardData);
      return response.status(201).json(newCard);
    }
  } catch (error) {
    console.error('Failed to create card \nAPI Error:', error);
    return response.status(500).json({error: error.message});
  }
  return response.status(405).json({ message: "Method not allowed" });
}
