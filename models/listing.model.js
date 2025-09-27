const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Review = require("./review.models");
const User = require("./user.model");

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
    url: String,
    filename: String,
    
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
  user:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if (listing){
    await Review.deleteMany({_id : { $in: listing.reviews }});
  }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
