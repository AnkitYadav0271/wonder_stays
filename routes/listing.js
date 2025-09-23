const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

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

//* Listing route is here

router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("Listings/listings.ejs", { allListings });
});

//*Show route is here

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const getListing = await Listing.findById(id).populate("reviews");
  if (getListing) {
    res.render("Listings/showListing.ejs", { getListing });
  } else {
    res.send("cant-find Listing try another one");
  }
});

//* New Listing route is here

router.get("/new", (req, res) => {
  res.render("Listings/newListing.ejs");
});

//* ADd Listing Post route

router.post("/", async (req, res) => {
  console.log(req.body);
  const { title, description, price, location, country } = req.body;
  const newListing = await Listing.insertOne({
    title,
    description,
    price,
    location,
    country,
  });
  newListing
    .save()
    .then(() => console.log("Add Listing is successful"))
    .catch((err) => console.log(err));

  res.redirect("/listings");
});

//* Edits get route is here
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const editListing = await Listing.findById(id);
  if (editListing) {
    res.render("Listings/updateListing.ejs", { editListing });
  } else {
    res.send("can't find listing in our db");
  }
});

//* Update route is here

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country } = req.body;
  await Listing.findByIdAndUpdate(
    id,
    { title, description, price, location, country },
    { new: true }
  );
  res.redirect("/listings");
});

//*Delete Listing Route is here

router.delete("/:id/destroy", async (req, res) => {
  const { id } = req.params;
  const deleteListing = Listing.findById(id);
  if (deleteListing) await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});
 
module.exports = router;