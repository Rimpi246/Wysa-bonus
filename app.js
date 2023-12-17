const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

//Mongoose connection
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => console.log("Connected to mongo server"))
  .catch((err) => console.error(err));

const mysecret = process.env.SECRET;

app.use(
  session({
    secret: mysecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const seedRoutes = require("./routes/seed");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const onboardingRoutes = require("./routes/onboarding");

app.use("/seed", seedRoutes);
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/api", onboardingRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
