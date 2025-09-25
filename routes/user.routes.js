const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.model");
const passport = require("passport");

//*_____________________Signup routes________________________//
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to wonderStays");
    res.redirect("/listings");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

//*_____________________Signup routes End________________________//

//*_____________________Login routes Starts ________________________//

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

//?here passport.authenticate() is middleware
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success","Happy to see you again");
    req.redirect("/listings");
    
  }
);

//*_____________________Login routes Ends________________________//
module.exports = router;
