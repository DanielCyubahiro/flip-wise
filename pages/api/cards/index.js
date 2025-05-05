import dbConnect from '@/config/database'
import Cards from '@/config/models/Card'
import Collections from '@/config/models/Collection'

export default async function handler(request, response) {
  try {
    await dbConnect()
    if (request.method === 'GET') {
      const cards = await Cards.find().populate('collectionId')
      return response.status(200).json(cards)
    }
    return response.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return response.status(500).json({ error: error.message })
  }
}
