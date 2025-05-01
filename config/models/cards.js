import mongoose from "mongoose";

const { Schema } = mongoose;

const cardsSchema = new Schema({
  collectionId: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Cards = mongoose.models.Cards || mongoose.model("Cards", cardsSchema);

export default Cards;
