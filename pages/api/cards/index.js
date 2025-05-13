import dbConnect from '@/config/database'
import Cards from '@/config/models/Card'
import Collections from '@/config/models/Collection'

export default async function handler(req, res) {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const cards = await Cards.find().populate('collectionId')
      return res.status(200).json(cards)
    }

    if (req.method === 'POST') {
      try {
        const cardData = req.body
        const newCard = await Cards.create(cardData)
        return res.status(201).json(newCard)
      } catch (err) {
        console.error('Error creating card:', err)
        return res.status(400).json({ message: 'Failed to create card' })
      }
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}
