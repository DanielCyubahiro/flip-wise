import dbConnect from '@/config/database'
import Cards from '@/config/models/Card'
import Collections from '@/config/models/Collection'

export default async function handler(request, response) {
  await dbConnect()

  const { id } = request.query

  if (request.method === 'GET') {
    try {
      const cardsInOneCollection = await Cards.find({
        collectionId: id,
      }).populate('collectionId')
      return response.status(200).json(cardsInOneCollection)
    } catch (err) {
      return response.status(500).json({ status: 'Failed to fetch collections.' })
    }
  }
}
