const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const slideshowSchema = mongoose.Schema(
  {
    isVisible: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: "Title is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    image: {
      type: String,
      required: "Image is required",
    },
    actionButton: {
      text: {
        type: String,
      },
      redirectUrlInternal: {
        redirectType: {
          type: String,
          match: [/EVENT|COURSE|ACTIVITY/, "Please fill a valid type"],
        },
        redirectID: {
          type: String,
        },
      },
      redirectUrlExternal: {
        type: String,
        match: [/^(https):\/\/[^ "]+$/, "Please fill a valid URL"],
      },
    },
  },
  {
    timestamps: true,
  }
);

slideshowSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Slideshow", slideshowSchema);
