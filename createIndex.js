import dbConnect from './config/database.js'
import CorrectCard from './config/models/CorrectCard.js'

async function run() {
  await dbConnect()
  try {
    const result = await CorrectCard.collection.createIndex({ cardId: 1 }, { unique: true })
    console.log('Index created:', result)
  } catch (err) {
    console.error('Error creating index:', err)
  }
  process.exit()
}

run()
