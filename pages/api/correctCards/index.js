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
      try {
        const markCard = await CorrectCard.create(correctCardData)
        return response.status(201).json(markCard)
      } catch (error) {
        if (error.code === 11000) {
          return response.status(409).json({ message: 'Card already marked as correct.' })
        }
        throw error
      }
    }

    if (request.method === 'DELETE') {
      const { cardId } = request.body
      await CorrectCard.deleteOne({ cardId })
      return response.status(200).json({ message: 'Card unmarked successfully.' })
    }

    return response.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return response.status(500).json({ error: error.message })
  }
}
