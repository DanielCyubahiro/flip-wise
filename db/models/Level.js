import mongoose from 'mongoose'

const { Schema } = mongoose

const LevelSchema = new Schema({
  title: { type: String, required: true },
  levelNumber: { type: Number, required: true, unique: true },
})

const Level = mongoose.models.Level || mongoose.model('Level', LevelSchema)

export default Level