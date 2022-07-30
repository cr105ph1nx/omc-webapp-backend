const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const hostSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: "Fullname is required",
      match: [
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Please fill a valid fullname",
      ],
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email"],
    },
    redirectPortfolio: {
      type: String,
      match: [/^(https):\/\/[^ "]+$/, "Please fill a valid URL"],
    },
    sessions: [
      {
        sessionType: {
          type: String,
          required: "Session type is required",
          match: [/COURSE|ACTIVITY/, "Please fill a valid session type"],
        },
        sessionID: {
          type: String,
          required: "Session ID is required",
        },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

hostSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Host", hostSchema);
