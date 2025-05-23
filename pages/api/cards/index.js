import dbConnect from '@/config/database'
import Card from '@/db/models/Card'
import Collection from '@/db/models/Collection'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ status: 'Not authorized' })
  }

  try {
    await dbConnect()

    if (req.method === 'GET') {
      const cards = await Card.find().populate('collectionId').sort({ _id: -1 })
      return res.status(200).json(cards)
    }

    if (req.method === 'POST') {
      try {
        const cardData = req.body
        const newCard = await Card.create(cardData)
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
