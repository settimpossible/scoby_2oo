const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    avatar: {
      type: String,
      default:
        "https://cdn1.iconfinder.com/data/icons/gardening-filled-line/614/1935_-_Growing_Plant-512.png",
    },
    category: [
      {
        type: String,
        enum: ["Plant", "Kombucha", "Kefir", "Vinegar"],
      },
    ],
    quantity: Number,
    address: String,
    geometry: {
      type: {
        type: String,
        // enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
      place_name: String,
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const itemModel = mongoose.model("Item", itemSchema);
module.exports = itemModel;
