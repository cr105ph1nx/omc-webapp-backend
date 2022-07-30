const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const reviewSchema = mongoose.Schema(
  {
    client_id: {
      type: String,
      required: "Client ID is required",
    },
    client_name: {
      type: String,
      required: "Client name is required",
    },
    client_photo: {
      type: String,
      required: "Client photo is required",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      required: "Rating is required",
      min: 0,
      max: 5,
    },
    session: {
      sessionType: {
        type: String,
        required: "Session type is required",
        match: [/EVENT|COURSE|ACTIVITY/, "Please fill a valid session type"],
      },
      sessionID: {
        type: String,
        required: "Session ID is required",
      },
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Review", reviewSchema);
