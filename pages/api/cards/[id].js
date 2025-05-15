import dbConnect from '@/lib/database'
import Card from '@/db/models/Card'
import CorrectCard from '@/db/models/CorrectCard'

export default async function handler(request, response) {
  await dbConnect()

  const { id } = request.query

  if (request.method === 'GET') {
    const card = await Card.findById(id)
    return response.status(200).json(card)
  }

  /*
  if (request.method === 'GET') {
    try {
      const correctCards = await CorrectCard.find({}, 'cardId')
      const correctCardIds = correctCards.map((document) => document.cardId.toString())
      const cardsInOneCollection = await Card.find({
        collectionId: id,
        _id: { $nin: correctCardIds },
      }).populate('collectionId')
      response.status(200).json(cardsInOneCollection)
      return
    } catch (err) {
      response.status(500).json({ status: 'Failed to fetch cards.' })
      return
    }
  }*/

  if (request.method === 'PUT') {
    try {
      const updatedCard = await Card.findByIdAndUpdate(id, request.body, {
        new: true,
      })
      return response.status(200).json(updatedCard)
    } catch (error) {
      return response.status(500).json({ error: 'Failed to update card' })
    }
  }

  if (request.method === 'DELETE') {
    try {
      await Card.findByIdAndDelete(id)
      return response.status(200).json({ status: 'Card deleted successfully' })
    } catch (err) {
      response.status(500).json({ status: 'Failed to delete card.' })
      return
    }
  }
  response.status(405).json({ message: 'Method Not Allowed' })
  response.setHeader('Allow', ['GET', 'PUT'])
  response.status(405).end(`Method ${request.method} Not Allowed`)
}
