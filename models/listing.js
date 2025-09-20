const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Review = require("./review.models");

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
    default:
      "https://unsplash.com/photos/body-of-water-near-mountain-O5rFo-cJu94",
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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if (listing){
    await Review.deleteMany({_id : { $in: listing.reviews }});
  }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
