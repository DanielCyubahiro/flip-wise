import dbConnect from '@/config/database'
import Card from '@/db/models/Card'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function handler(request, response) {
  await dbConnect()
  const session = await getServerSession(request, response, authOptions)

  if (!session) {
    return response.status(401).json({ status: 'Not authorized' })
  }

  const { id } = request.query

  if (request.method === 'GET') {
    try {
      const card = await Card.findById(id)
      return response.status(200).json(card)
    } catch (err) {
      response.status(500).json({ status: 'Failed to fetch cards.' })
      return
    }
  }

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
}
