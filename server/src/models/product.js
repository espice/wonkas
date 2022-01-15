const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is missing"],
    },
    description: {
      type: String,
      default:
        "Crafted by the finest Oompa Loompas from Loompaland, this is one of the most popular items in the store.",
    },
    picture: {
      type: String,
      required: [true, "Picture is missing"],
    },
    price: {
      type: Number,
      required: [true, "Price is missing"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
