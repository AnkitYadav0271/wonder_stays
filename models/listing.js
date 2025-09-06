const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 400,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:"https://unsplash.com/photos/body-of-water-near-mountain-O5rFo-cJu94",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/body-of-water-near-mountain-O5rFo-cJu94"
        : v,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
