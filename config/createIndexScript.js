import dbConnect from './database.js'
import CorrectCard from './models/CorrectCard.js'

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
