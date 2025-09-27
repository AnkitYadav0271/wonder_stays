const Listing = require("../models/listing.model");
const Review = require("../models/review.models");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "user must be login");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) res.locals.redirectUrl = req.session.redirectUrl;
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash(`error","can't find listing :${id}`);
    return res.redirect("/listings");
  }
  if (req.user && !listing.user._id.equals(req.user._id)) {
    req.flash("error", "You do not have permission to edit");
    return res.redirect(`/listings`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewId, id } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not author of the Review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
