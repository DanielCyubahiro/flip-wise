import dbConnect from '@/config/database'
import CorrectCard from '@/config/models/CorrectCard'

export default async function handler(request, response) {
  try {
    await dbConnect()
    if (request.method === 'GET') {
      const correctCards = await CorrectCard.find()
      return response.status(200).json(correctCards)
    }

    if (request.method === 'POST') {
      const correctCardData = request.body
      return await CorrectCard.create(correctCardData)
    }

    return response.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return response.status(500).json({ error: error.message })
  }
}
