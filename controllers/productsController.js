const Product = require("../models/Product");

// Product CRUD--------------------------------------------------------------------------------
const create = async (req, res) => {
  try {
    const createdProduct = await Product.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const index = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const showProduct = await Product.findById(req.params.id);
    res.status(200).json(showProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  create,
  index,
  delete: deleteProduct,
  update,
  show,
};