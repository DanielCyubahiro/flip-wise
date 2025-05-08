import mongoose from 'mongoose'

const { Schema } = mongoose

const correctCardSchema = new Schema({
  cardId: { type: String, required: true },
})

const CorrectCard = mongoose.models.CorrectCard || mongoose.model('CorrectCard', correctCardSchema)

export default CorrectCard
