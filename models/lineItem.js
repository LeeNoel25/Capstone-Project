// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const lineItemSchema = new Schema({
//     Product: {
//     type: Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
// });


// lineItemSchema.virtual("extPrice").get(function () {
//   return this.qty * this.item.price;
// });

// module.exports = mongoose.model("LineItem", lineItemSchema);
