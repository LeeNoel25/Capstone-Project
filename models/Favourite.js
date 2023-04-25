const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema(
  {
    member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favourite", FavouriteSchema);