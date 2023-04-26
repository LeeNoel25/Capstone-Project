const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
