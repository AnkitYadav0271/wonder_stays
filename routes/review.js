const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.models.js");
const { reviewSchema } = require("../schema.js");

const Listing = require("../models/listing.model.js");

//*Reviews Post Route is here

router.post("/", async (req, res) => {
  console.log("Checking the id of the:", req.params);
  const { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
});

//* Delete Review method is here
router.delete("/:reviewId", async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //* A nice concept that everyone should learn
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
});

module.exports = router;
