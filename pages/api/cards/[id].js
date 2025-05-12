import dbConnect from '@/config/database'
import Cards from '@/config/models/Card'
import CorrectCard from '@/config/models/CorrectCard'

export default async function handler(request, response) {
  await dbConnect()

  const { id } = request.query

  if (request.method === 'GET') {
    try {
      const correctCards = await CorrectCard.find({}, 'cardId')
      const correctCardIds = correctCards.map((document) => document.cardId.toString())
      const cardsInOneCollection = await Cards.find({
        collectionId: id,
        _id: { $nin: correctCardIds },
      }).populate('collectionId')
      response.status(200).json(cardsInOneCollection)
      return
    } catch (err) {
      response.status(500).json({ status: 'Failed to fetch cards.' })
      return
    }
  }

  if (request.method === 'DELETE') {
    try {
      await Cards.findByIdAndDelete(id)
      return response.status(200).json({ status: 'Card deleted successfully' })
    } catch (err) {
      response.status(500).json({ status: 'Failed to delete card.' })
      return
    }
  }
  response.status(405).json({ message: 'Method Not Allowed' })
}
