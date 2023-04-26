const Favorite = require("../models/Favorite");
const Member = require("../models/Member");
const Product = require("../models/Product");

const getFavorites = async (memberId, token) => {
  // const res = await fetch(`/api/favorites/${memberId}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + token,
  //   },
  // });
  // if (!res.ok) throw new Error("Error fetching favorites");
  // return await res.json();
};

const addFavorite = async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const productId = req.body.productId;

    const member = await Member.findById(memberId);
    const product = await Product.findById(productId);

    if (!member || !product) {
      return res.status(400).json({ message: "Invalid member or product ID" });
    }

    const existingFavorite = await Favorite.findOne({
      member: memberId,
      product: productId,
    });
    if (existingFavorite) {
      return res.status(400).json({ message: "Favorite already exists" });
    }

    const newFavorite = new Favorite({ member: memberId, product: productId });
    await newFavorite.save();

    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const productId = req.body.productId;

    const result = await Favorite.findOneAndDelete({
      member: memberId,
      product: productId,
    });
    if (!result) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  get: getFavorites,
  add: addFavorite,
  delete: deleteFavorite,
};
