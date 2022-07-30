require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.on("open", () => console.log("Connected to database !"));

app.use(express.json());
require("./routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
