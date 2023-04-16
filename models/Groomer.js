const mongoose = require("mongoose");
const { Schema } = mongoose;

const groomerSchema = new Schema(
  {
    name: { type: String, required: true },
    location: {id: { type: Schema.Types.ObjectId, ref: 'Location', required: true},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Groomer", groomerSchema);
