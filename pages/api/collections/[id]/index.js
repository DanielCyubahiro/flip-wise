import dbConnect from '@/config/database'
import Card from '@/db/models/Card'
import Collection from '@/db/models/Collection'

export default async function handler(request, response) {
  await dbConnect()

  const { id } = request.query

  if (request.method === 'GET') {
    try {
      const cardsInOneCollection = await Card.find({
        collectionId: id,
      })
        .populate('collectionId')
        .sort({ _id: -1 })
      return response.status(200).json(cardsInOneCollection)
    } catch (err) {
      return response.status(500).json({ status: 'Failed to fetch collections' })
    }
  }
}
