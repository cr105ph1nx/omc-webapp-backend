require("dotenv").config();
// use and initialize express app
const express = require("express");
const app = express();
// initialize and use cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// use and initialize express-session and passport
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET, //cookie:{secure:true},
    resave: false,
    saveUninitialized: true,
  })
);
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// connect to db
const mongoose = require("mongoose");
const { cookie } = require("express/lib/response");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.on("open", () => console.log("Connected to database !"));

app.use(express.json());

// require routes
require("./routes")(app);

// listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
