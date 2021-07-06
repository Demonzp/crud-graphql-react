const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },
  },

  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  },
);

module.exports.Product = mongoose.model('Product', ProductSchema);