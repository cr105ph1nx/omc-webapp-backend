const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    rating: {
      type: Number,
      required: "rating is required",
      default: 5,
      min: 0,
      max: 5,
    },
    tags: [
      {
        type: String,
        required: "Tag is required",
      },
    ],
    description: {
      type: String,
      required: "Description is required",
    },
    images: [
      {
        type: String,
      },
    ],
    websiteUrl: {
      type: String,
      match: [/^(https):\/\/[^ "]+$/, "Please fill a valid URL"],
    },
    agendaUrl: {
      type: String,
      match: [/^(https):\/\/[^ "]+$/, "Please fill a valid URL"],
    },
    sponsoringFolderUrl: {
      type: String,
      match: [/^(https):\/\/[^ "]+$/, "Please fill a valid URL"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

eventSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Event", eventSchema);
