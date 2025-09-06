const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

//*Mongo code
const MONGO_URI = "mongodb://127.0.0.1:27017/wonderstays";
async function main() {
  await mongoose.connect(MONGO_URI);
}

main()
  .then((res) => console.log("Mongo connection established"))
  .catch((err) => console.log(err));

//* Mongo Ends here
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to home route");
});

const sampleListing = {
  title: "Cozy Lakeside Cabin with Stunning Mountain Views",
  description:
    "Escape to this peaceful lakeside retreat nestled in the heart of the mountains. Perfect for weekend getaways, remote work, or nature lovers.",
  image: "", // Will default to Unsplash image via the setter
  price: 7500,
  location: "Nainital, Uttarakhand",
  country: "India",
};
sampleListing

app.get("/testlisting",async(req,res)=>{
    let newListing = Listing(sampleListing);
   await newListing.save();
    res.send("listing success")
})
app.listen(6969, () => {
  console.log("server is running at the port 6969");
});
