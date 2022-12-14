const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const activitySchema = mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: "Title is required",
    },
    rating: {
      type: Number,
      default: null,
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
    location: {
      name: {
        type: String,
        required: "Location name is required",
      },
      url: {
        type: String,
        match: [/^(https):\/\/[^ "]+$/, "Please fill a valid URL"],
      },
    },
    startDate: {
      type: Date,
      required: "Start date is required",
    },
    endDate: {
      type: Date,
    },
    period: {
      type: Number,
      min: 0,
      required: "Period is required",
    },
    capacity: {
      type: Number,
      min: 0,
      required: "Capacity is required",
    },
    level: {
      type: String,
      required: "Level is required",
      match: [
        /Beginner|Intermediate|Advanced|All/,
        "Please fill a valid level",
      ],
    },
    resources: {
      type: String,
    },
    host: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Host",
        required: "Host is required",
        unique: true,
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        unique: true,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

activitySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Activity", activitySchema);
