const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");

//*Mongo coden
const MONGO_URI = "mongodb://127.0.0.1:27017/wonderstays";
async function main() {
  await mongoose.connect(MONGO_URI);
}

main()
  .then((res) => console.log("Mongo connection established"))
  .catch((err) => console.log(err));

//* Mongo Ends here

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//* Listing route is here

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("Listings/listings.ejs", { allListings });
});

//*Show route is here

app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const getListing = await Listing.findById(id);
  if (getListing) {
    res.render("Listings/showListing.ejs", { getListing });
  } else {
    res.send("cant-find Listing try another one");
  }
});

//* New Listing route is here

app.get("/listing/new", (req, res) => {
  res.render("Listings/newListing.ejs");
});

//* ADd Listing Post route

app.post("/listings", async (req, res) => {
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
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const editListing = await Listing.findById(id);
  if (editListing) {
    res.render("Listings/updateListing.ejs", { editListing });
  } else {
    res.send("can't find listing in our db");
  }
});

//* Update route is here

app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country } = req.body;
  await Listing.findByIdAndUpdate(
    id,
    { title, description, price, location, country },
    { new: true }
  );
  res.redirect("/listings");
});

//*Delete Route is here

app.delete("/listings/:id/destroy", async (req, res) => {
  const { id } = req.params;
  const deleteListing = Listing.findById(id);
  if (deleteListing) await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.listen(6969, () => {
  console.log("server is running at the port 6969");
});
