const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commenter: {
      type: Schema.Types.ObjectId,
      ref: "member"
  },
  name: {
      type: String,
  },
  content: {
      type: String,
  },
  createdAt: { 
      type: Date, 
      default: Date.now}
}, {
  timestamps: true
})

const ratingSchema = new Schema({
  rater: {
      type: Schema.Types.ObjectId,
      ref: "member"
  },
  rating: {
      type: Number,
  }
}, {
  timestamps: true
})

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    imgurl: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    comments: [commentSchema],
    rating: [ratingSchema],

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
