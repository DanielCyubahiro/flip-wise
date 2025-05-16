import dbConnect from '@/config/database'
import Collection from '@/db/models/Collection'

export default async function handler(request, response) {
  try {
    await dbConnect()
    if (request.method === 'GET') {
      const collections = await Collection.find()
      return response.status(200).json(collections)
    }
    return response.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return response.status(500).json({ error: error.message })
  }
}
