const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const { options } = require("joi");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.model.js");
const userRouter = require("./routes/user.routes.js");
const multer = require("multer");
const upload = multer({ dest: "/uploads" });
const dotenv = require("dotenv");

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
  cookie: {
    expires: Date.now() * 7 * 24 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true,
  },
};

dotenv.config();
//*----------middleware starts ----------*//
app.use(session(sessionOptions));
app.use(flash());

//* passport also uses session middleware so we also need session middleware with it always
//?Initializing the passport middleware
app.use(passport.initialize());
app.use(passport.session());

//!Above to middleware is important should be always in every passport project
//* The below line is to authenticate our local users (It's middleware of passport)
passport.use(new LocalStrategy(User.authenticate()));

//* for serialization and deserialization passport middleware
passport.serializeUser(User.serializeUser()); //serialize user does the thing that user do not have to login again and till current session

passport.deserializeUser(User.deserializeUser()); // deserialize user does the thing of re login the user if current session is over

//*Flash middleware
app.use((req, res, next) => {
  res.locals.message = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//*-------Middleware ends --------*//

//*-------Routes Starts Here ---------//

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.listen(6969, () => {
  console.log("server is running at the port 6969");
});
