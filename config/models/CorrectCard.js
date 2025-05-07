import mongoose from 'mongoose'

const { Schema } = mongoose

const correctCardsSchema = new Schema({
  cardId: { type: String, required: true },
})

const CorrectCards =
  mongoose.models.CorrectCard || mongoose.model('CorrectCard', correctCardsSchema)

export default CorrectCards
