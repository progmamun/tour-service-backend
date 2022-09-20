const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide a Service Name for this tours'],
      trim: true,
      unique: [true, 'Service Name must be unique'],
      minLength: [3, 'Service Name must be at least 3 characters'],
      maxLength: [100, 'Service Name is to large'],
    },

    description: {
      type: String,
      required: [true, 'please provide a description for this tours'],
    },

    image: String,

    price: {
      type: Number,
      required: [true, 'please provide price for this tours'],
      min: [0, "price can't be negative"],
    },

    visitor: {
      type: Number,
      required: true,
      min: [0, "visitor can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: 'visitor must be an integer',
    },

    viewCount: {
      type: Number,
      default: 0,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: 'book-now',
      enum: {
        values: ['book-now', 'wish-list'],
        message: "status value can't be {VALUE}, must be book-now/wish-list",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Tours = mongoose.model('Tours', toursSchema);

module.exports = Tours;
