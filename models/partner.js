const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const partnerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      match: [
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Please fill a valid fullname",
      ],
    },
    logo: {
      type: String,
      required: "Logo is required",
    },
    url: {
      type: String,
      match: [/^(https):\/\/[^ "]+$/, "Please fill a valid URL"],
    },
  },
  {
    timestamps: true,
  }
);

partnerSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Partner", partnerSchema);
