import dbConnect from './database.js'
import mongoose from 'mongoose'

const collections = [
  {
    id: '1',
    title: 'Mathematics',
  },
  {
    id: '2',
    title: 'Biology',
  },
  {
    id: '3',
    title: 'Chemistry',
  },
  {
    id: '4',
    title: 'Physics',
  },
  {
    id: '5',
    title: 'Geography',
  },
  {
    id: '6',
    title: 'History',
  },
  {
    id: '7',
    title: 'Literature',
  },
  {
    id: '8',
    title: 'Art',
  },
  {
    id: '9',
    title: 'Music',
  },
  {
    id: '10',
    title: 'Informatics',
  },
]
const cards = [
  {
    id: '1',
    collectionId: '2',
    question: 'What is the powerhouse of the cell?',
    answer: 'The mitochondrion',
  },
  {
    id: '2',
    collectionId: '2',
    question: 'What is the process by which plants make their food?',
    answer: 'Photosynthesis',
  },
  {
    id: '3',
    collectionId: '2',
    question: 'What are the building blocks of proteins?',
    answer: 'Amino acids',
  },
  {
    id: '4',
    collectionId: '2',
    question: 'What is the largest organ in the human body?',
    answer: 'The skin',
  },
  {
    id: '5',
    collectionId: '2',
    question: 'What is the main function of red blood cells?',
    answer: 'To transport oxygen',
  },
  {
    id: '6',
    collectionId: '5',
    question: 'What is the capital of France?',
    answer: 'Paris',
  },
  {
    id: '7',
    collectionId: '5',
    question: 'Which river is the longest in the world?',
    answer: 'The Nile',
  },
  {
    id: '8',
    collectionId: '5',
    question: 'What is the largest desert in the world?',
    answer: 'The Sahara Desert',
  },
  {
    id: '9',
    collectionId: '5',
    question: 'Which country has the most population?',
    answer: 'China',
  },
  {
    id: '10',
    collectionId: '5',
    question: 'What is the smallest continent by land area?',
    answer: 'Australia',
  },
  {
    id: '11',
    collectionId: '10',
    question: 'What does HTML stand for?',
    answer: 'HyperText Markup Language',
  },
  {
    id: '12',
    collectionId: '10',
    question: 'What is the name of the first electronic general-purpose computer?',
    answer: 'ENIAC',
  },
  {
    id: '13',
    collectionId: '10',
    question: 'Who is known as the father of computers?',
    answer: 'Charles Babbage',
  },
  {
    id: '14',
    collectionId: '10',
    question: 'What does CPU stand for?',
    answer: 'Central Processing Unit',
  },
  {
    id: '15',
    collectionId: '10',
    question: 'What is the main function of RAM?',
    answer: 'To store data temporarily',
  },
  {
    id: '16',
    collectionId: '3',
    question: 'What is the pH level of pure water?',
    answer: '7',
  },
  {
    id: '17',
    collectionId: '3',
    question: 'What is the periodic table?',
    answer: 'A table of chemical elements arranged by atomic number',
  },
  {
    id: '18',
    collectionId: '3',
    question: 'What is the process of converting a liquid into vapour called?',
    answer: 'Evaporation',
  },
  {
    id: '19',
    collectionId: '4',
    question: 'What is the force that keeps us on the ground?',
    answer: 'Gravity',
  },
  {
    id: '20',
    collectionId: '4',
    question: 'What is the speed of light?',
    answer: '299,792,458 meters per second',
  },
  {
    id: '21',
    collectionId: '4',
    question: 'Who developed the theory of relativity?',
    answer: 'Albert Einstein',
  },
  {
    id: '22',
    collectionId: '8',
    question: 'Who painted the Mona Lisa?',
    answer: 'Leonardo da Vinci',
  },
  {
    id: '23',
    collectionId: '8',
    question: "What is the primary colour of the sky in the painting 'Starry Night' by Van Gogh?",
    answer: 'Blue',
  },
  {
    id: '24',
    collectionId: '8',
    question: 'What is the art technique that uses small dots to create a larger image?',
    answer: 'Pointillism',
  },
  {
    id: '25',
    collectionId: '9',
    question: 'Who composed the Four Seasons?',
    answer: 'Antonio Vivaldi',
  },
  {
    id: '26',
    collectionId: '9',
    question: "What is the musical term for 'loud'?",
    answer: 'Forte',
  },
  {
    id: '27',
    collectionId: '9',
    question: 'What is the term for a piece of music written for a solo instrument?',
    answer: 'Sonata',
  },
  {
    id: '28',
    collectionId: '1',
    question: 'What is the value of pi up to two decimal places?',
    answer: '3.14',
  },
  {
    id: '29',
    collectionId: '1',
    question: 'What is the square root of 144?',
    answer: '12',
  },
  {
    id: '30',
    collectionId: '1',
    question: 'How many sides does a hexagon have?',
    answer: 'Six',
  },
]

async function seedDB() {
  try {
    // Connect to MongoDB using your dbConnect function
    await dbConnect()

    // Get mongoose connection
    const db = mongoose.connection

    // Verify connection is established
    if (!db) {
      throw new Error('MongoDB connection not established')
    }

    // Clear existing data
    await db.collection('collections').deleteMany({})
    await db.collection('cards').deleteMany({})

    // Insert collections and create id map
    const insertedCollections = await db
      .collection('collections')
      .insertMany(collections.map(({ title }) => ({ title })))

    const idMap = {} // oldId -> newObjectId
    Object.keys(insertedCollections.insertedIds).forEach((key, index) => {
      idMap[collections[index].id] = insertedCollections.insertedIds[key]
    })

    // Prepare cards with new ObjectId references
    const cardsToInsert = cards.map((card) => ({
      question: card.question,
      answer: card.answer,
      collectionId: idMap[card.collectionId], // Replace string id with ObjectId
    }))

    await db.collection('cards').insertMany(cardsToInsert)

    console.log('✅ Data seeded successfully.')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    // Close the connection if it exists
    if (mongoose.connection) {
      await mongoose.connection.close()
    }
    process.exit(0)
  }
}

seedDB()
