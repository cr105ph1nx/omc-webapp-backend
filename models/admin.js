const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email"],
      required: "Email is required",
    },
    password: {
      type: String,
      match: [
        /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/,
        "Please fill a valid password",
      ],
      required: "Password is required",
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Admin", adminSchema);
