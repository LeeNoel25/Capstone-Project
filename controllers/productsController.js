const Product = require("../models/Product");

// Create
const create = async (req, res) => {
  try {
    const createdProduct = await Product.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read
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

// Update
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

// Delete
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


// const showProducts = async (req, res) => {
//   try {
//     const query = {};
//     const products = await Products.find(query).sort({
//       name: 1,
//       category: 1,
//       brand: 1,
//     });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const addProducts = async (req, res) => {
//   try {
//     const productExists = await Products.findOne({ name: req.body.name });
//     if (productExists) {
//       throw new Error("Product with the same name already exists");
//     }
//     let brand = req.body.brand;
//     if (brand === "Other") {
//       const newBrand = req.body.newBrands.trim();
//       const brandExists = await Products.findOne({
//         brand: newBrand,
//       });
//       if (brandExists) {
//         throw new Error("Brand already exists");
//       }
//       brand = newBrand;
//     }
//     const { newBrands, ...newProduct } = req.body; // Remove the newBrands field
//     newProduct.brand = brand; // Replace newBrands with brand if it's "Other"

//     const product = await Products.create(newProduct);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const updateProducts = async (req, res) => {
//   try {
//     const updatedName = req.body.name;
//     const existingProduct = await Products.findOne({ name: updatedName });
//     if (existingProduct && existingProduct._id.toString() !== req.params.id) {
//       throw new Error("Another product with the same name already exists");
//     }

//     const updatedProduct = await Products.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };