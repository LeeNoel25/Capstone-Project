const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const memberSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    unique: true,
    maxLength: 15,
   },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "member",
    enum: ["member", "admin"],
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product', 
    }
  ],
}, {
  timestamps: true
});

//--------
// memberSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
//   return next();
// });

// memberSchema.pre('save', function(next) {
//   this.name = capitalize(this.name);
//   next();
// });

// const capitalize = (str) => {
//   return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
// }
//--------




module.exports = mongoose.model("Member", memberSchema);
