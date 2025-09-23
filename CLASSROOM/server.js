const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req,res,next)=>{
  res.locals.successMsg = req.flash("successMsg","Register is Successful");
  res.locals.errorMsg = req.flash("errorMsg","user not registered");
  next();
})

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());
app.get("/secret", (req, res) => {
  res.send("my super secret");
});

app.get("/reqCount", (req, res) => {
  if (req.session.count) req.session.count++;
  else req.session.count = 1;

  res.send(`You send request ${req.session.count} times`);
});

app.get("/register", (req, res) => {
  const { name = "Happy" } = req.query;
  req.session.name = name;
  if (name === "Happy") req.flash("message", "user not registered");
  else req.flash("message", "Register is successful");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  
  res.render("page.ejs", { name: req.session.name });
});
app.listen(3030, () => {
  console.log("server is running on 3030");
});
