import dbConnect from '@/config/database'
import CorrectCard from '@/db/models/CorrectCard'

export default async function handler(request, response) {
  try {
    await dbConnect()
    if (request.method === 'GET') {
      try {
        const correctCards = await CorrectCard.find()
        return response.status(200).json(correctCards)
      } catch (error) {
        console.error('Error fetching correct cards:', error)
        return response.status(500).json({ message: 'Failed to fetch correct cards.' })
      }
    }

    if (request.method === 'POST') {
      const correctCardData = request.body
      try {
        const markCard = await CorrectCard.create(correctCardData)
        return response.status(201).json(markCard)
      } catch (error) {
        return response.status(500).json({ message: 'Failed to mark card as correct.' })
      }
    }
    return response.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return response.status(500).json({ error: error.message })
  }
}
