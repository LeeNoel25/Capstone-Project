const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const seed = async (req, res) => {
  try {
    const existingMember = await Member.findOne({ email: "gro@gro" });
    if (existingMember) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash("111", SALT_ROUNDS);
    const memberData = await Member.create({
      name: "groomer",
      email: "gro@gro",
      password: hashedPassword,
      role: "groomer",
    });
    res.status(200).json(memberData);
  } catch (error) {
    res.status(500).json(error);
  }
};

// create function redeclared, which was already declared in the Product controller. If they are in the same file, you should rename one of the create functions, such as createMember.
const createMember = async (req, res) => {
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

module.exports = {
  seed,
  createMember,
  login,
  resetPassword,
};
