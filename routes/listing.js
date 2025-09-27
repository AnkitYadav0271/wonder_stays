const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.model.js");
const session = require("express-session");
const flash = require("connect-flash");
const { isLoggedIn, isOwner } = require("../middleware/middleware.js");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudConfig.js");
const upload = multer({ storage });

//* Validation middleware is here
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new error(404, errMsg);
  } else {
    next();
  }
};

//* Flash Middleware is here

//* Listing route is here

router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("Listings/listings.ejs", { allListings });
});

//* New Listing route is here

router.get("/new", isLoggedIn, (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("Listings/newListing.ejs");
  }
  req.flash("error", "user must be login to create new Listing");
  res.redirect("/login");
});

//*Show route is here

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const getListing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("user");
  if (getListing) {
    res.render("Listings/showListing.ejs", { getListing });
  } else {
    req.flash("error", "Listing could not be find");
    res.redirect("/listings");
  }
});

//* Add Listing Post route

router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  async (req, res) => {
    const { title, description, price, location, country } = req.body;
    const url = req.file.path;
    const filename = req.file.fieldname;
    const newListing = await Listing.insertOne({
      title,
      description,
      price,
      location,
      country,
    });

    newListing.user = req.user._id;
    newListing.image = { url, filename };
    req.flash("success", "new listing added successfully");
    newListing
      .save()
      .then(() => console.log("Add Listing is successful"))
      .catch((err) => console.log(err));

    res.redirect("/listings");
  }
);

//* Edits get route is here
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const editListing = await Listing.findById(id);
  if (editListing) {
    res.render("Listings/updateListing.ejs", { editListing });
  } else {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
});

//* Update route is here

router.put("/:id", isLoggedIn, isOwner, async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country } = req.body;
  await Listing.findByIdAndUpdate(
    id,
    { title, description, price, location, country },
    { new: true }
  );
  req.flash("success", "Listing Edited successfully");
  res.redirect(`/listings/${id}`);
});

//*Delete Listing Route is here

router.delete("/:id/destroy", isLoggedIn, isOwner, async (req, res) => {
  const { id } = req.params;
  const deleteListing = await Listing.findById(id);
  if (deleteListing) {
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted successfully");
    res.redirect(`/listings`);
  }
});

module.exports = router;
