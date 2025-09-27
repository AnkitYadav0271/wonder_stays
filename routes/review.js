const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.models.js");
const { reviewSchema } = require("../schema.js");

const Listing = require("../models/listing.model.js");
const { isLoggedIn, isOwner, isReviewAuthor } = require("../middleware/middleware.js");

//*Reviews Post Route is here

router.post("/", isLoggedIn, async (req, res) => {
  console.log("Checking the id of the:", req.params);
  const { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
});

//* Delete Review method is here
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, async (req, res) => {
  let { id, reviewId } = req.params;
 let updateListing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //* A nice concept that everyone should learn
  if(!updateListing){
    res.send("no update listing");
  }
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
});

module.exports = router;
