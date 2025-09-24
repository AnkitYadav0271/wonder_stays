const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const { options } = require("joi");

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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() * 7 * 24 * 60 * 1000,
    maxAge:7 * 24 * 60 * 1000,
    httpOnly:true
  }
};

app.use(session(sessionOptions));
app.use(flash())

//*Flash middleware
app.use((req,res,next)=>{
res.locals.message = req.flash('success');
res.locals.error = req.flash("error");
  next();
})
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.listen(6969, () => {
  console.log("server is running at the port 6969");
});
