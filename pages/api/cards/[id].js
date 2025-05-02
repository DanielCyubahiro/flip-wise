import dbConnect from '@/config/database';
import Cards from '@/config/models/Card';

export default async function handler(request, response) {
  try {
    await dbConnect();
    const {id} = request.query;
    if (request.method === 'DELETE') {
      await Cards.findByIdAndDelete(id);
      return response.status(200).
          json({status: 'Card deleted successfully'});
    }
    return response.status(405).json({message: 'Method not allowed'});
  } catch (error) {
    console.error('API Error:', error);
    return response.status(500).json({error: error.message});
  }
}