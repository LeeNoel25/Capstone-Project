const Product = require("../models/Product");
const Member = require("../models/Member");

// CRUD functions for Product model
const create = async (req, res) => {
  try {
    // Create a new product using the request body
    const createdProduct = await Product.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    // Return a more descriptive error message
    res.status(400).json({ error: `Failed to create product: ${error.message}` });
  }
};

const index = async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    // Fetch a single product by its ID
    const showProduct = await Product.findById(req.params.id);
    res.status(200).json(showProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    // Update a product by its ID using the request body
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
    // Delete a product by its ID
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//---------------

// Function to show a single product along with its ratings
const showWithRatings = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // Use aggregation to compute average rating and rating count
    const ratingsData = await Product.aggregate([
      { $match: { _id: product._id } },
      {
        $project: {
          averageRating: { $avg: "$rating.rating" },
          ratingsCount: { $size: "$rating" },
        },
      },
    ]);

    const { averageRating, ratingsCount } = ratingsData[0];

    const productWithRatings = {
      ...product.toObject(),
      averageRating: isNaN(averageRating) ? "No Rating" : parseFloat(averageRating.toFixed(2)),
      ratings: ratingsCount,
    };
    res.status(200).json(productWithRatings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to set or update a rating for a product
const setRating = async (req, res) => {
  try {
    const {rating,member} = req.body
    const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id, 'rating.rater': member._id },
        { $set: { 'rating.$.rating': rating } },
        { new: true }
        );
      if (updatedProduct) {
        const ratings = await Member.find({ product: req.params.id }).select('rating');
        const averageRating = calculateAverageRating(ratings);
        res.status(201).json(averageRating);
      } else {
        const newUpdatedProduct = await Product.findOneAndUpdate(
            { _id: req.params.id, 'rating.rater': { $ne: member._id } },
            { $push: { rating: { rater: member._id, rating: rating } } },
            { new: true }
            );
        const ratings = await Member.find({ product: req.params.id }).select('rating');
        const averageRating = calculateAverageRating(ratings);
        res.status(201).json(averageRating);
      }
    } catch (error) {
        res.status(500).json(error);
    }
}

// Function to add a comment to a product
const setComment = async (req, res) => {
  try {
      const { comment , member } = req.body
      const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { $push: {"comments":[{ 
              "commenter": member._id, 
              "name": member.name, 
              "content": comment,
           }]} 
          },
          { new: true }
      );
      res.status(201).json(updatedProduct);
  }
  catch (error) {
      res.status(500).json(error);
  }
}


module.exports = {
  create,
  index,
  delete: deleteProduct,
  update,
  show,
  showWithRatings,
  setRating,
  setComment
};