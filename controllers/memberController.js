const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const seed = async (req, res) => {
  try {
    const existingMember = await Member.findOne({ email: "admin@admin" });
    if (existingMember) {
      return res.status(400).json({ error: "Admin user already exists" });
    }
    const hashedPassword = await bcrypt.hash("111", SALT_ROUNDS);
    const memberData = await Member.create({
      name: "admin",
      email: "admin@admin",
      password: hashedPassword,
      role: "admin",
    });
    res.status(200).json(memberData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { email, password, name } = req.body;
  if (password.length < 3) {
    return res.status(400).json({ error: "password too short" });
  }
  try {
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newMember = await Member.create({
      email,
      password: hashedPassword,
      name,
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (password.length < 3) {
    return res.status(400).json({ message: "Password too short" });
  }
  try {
    const member = await Member.findOne({ email: email });
    console.log(`member: ${member}`);
    if (!member) {
      res.status(400).json({ message: "member does not exist" });
      return;
    }
    const match = await bcrypt.compare(password, member.password);
    if (match) {
      const payload = { member };
      console.log(`payload: ${payload}`);
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24Hrs" });
      res.status(200).json({ token, member });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (password.length < 3) {
    return res.status(400).json({ error: "Password too short" });
  }

  try {
    const existingMember = await Member.findOne({ email });
    if (!existingMember) {
      return res.status(400).json({ error: "Invalid Email " });
    }

    const checkMatch = await bcrypt.compare(password, existingMember.password);

    if (!checkMatch) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(password, salt);
      existingMember.password = hash;
      await existingMember.save();
      res.status(200).json({ message: "Password successfully changed" });
    } else {
      res.status(401).json({ message: "Error in changing password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFavorites = async (req, res) => {
  const { memberId } = req.params;

  try {
    const member = await Member.findById(memberId).populate("favorites");
    res.status(200).json(member.favorites);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching favorite products." });
  }
};

// Add favorite product
const addFavorite = async (req, res) => {
  const { memberId, productId } = req.params;
  try {
    // Find the member and add the product ID to the favorites array
    await Member.findByIdAndUpdate(memberId, {
      $addToSet: { favorites: productId },
    });
    res.status(200).json({ message: "Product added to favorites." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the product to favorites." });
  }
};

const removeFavorite = async (req, res) => {
  const { memberId, productId } = req.params;
  try {
    // Find the member and remove the product ID from the favorites array
    await Member.findByIdAndUpdate(memberId, {
      $pull: { favorites: productId },
    });

    res.status(200).json({ message: "Product removed from favorites." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while removing the product from favorites." });
  }
};

module.exports = {
  seed,
  create,
  login,
  resetPassword,
  addFavorite,
  removeFavorite,
  getFavorites
};
