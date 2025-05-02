import mongoose from "mongoose";
import Collections from "./Collection";

const { Schema } = mongoose;

const cardsSchema = new Schema({
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Cards = mongoose.models.Card || mongoose.model("Card", cardsSchema);

export default Cards;
