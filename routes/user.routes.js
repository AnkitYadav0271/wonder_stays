const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.model");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware/middleware");

//*_____________________Signup routes________________________//

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      } else {
        req.flash("success", "Welcome to wonderStays");
        res.redirect("/listings");
      }
    });
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
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Happy to see you again");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
);

//*_____________________Login routes Ends________________________//

//*_____________________Logout routes starts ________________________//

router.get("/logout", async (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "Logout successful");
      res.redirect("/listings");
    }
  });
});

//*_____________________Logout routes Ends________________________//
module.exports = router;
