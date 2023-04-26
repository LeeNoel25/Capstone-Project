const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
  {
    member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);