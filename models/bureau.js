const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bureauSchema = mongoose.Schema(
  {
    isVisible: {
      type: Boolean,
      default: false,
    },
    year: {
      type: Number,
      required: "Year is required",
      unique: true,
    },
    president: {
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
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please fill a valid email",
        ],
      },
      phonenumber: {
        type: String,
        required: "Phone number is required",
        unique: true,
        match: [
          /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
          "Please fill a valid phone number",
        ],
      },
      studentID: {
        type: String,
        required: "Student ID is required",
        unique: true,
      },
      images: [
        {
          type: String,
          required: "Image is required",
        },
      ],
    },
    vicePresident: {
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
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please fill a valid email",
        ],
      },
      phonenumber: {
        type: String,
        required: "Phone number is required",
        unique: true,
        match: [
          /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
          "Please fill a valid phone number",
        ],
      },
      studentID: {
        type: String,
        required: "Student ID is required",
        unique: true,
      },
      images: [
        {
          type: String,
          required: "Image is required",
        },
      ],
    },
    secretary: {
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
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please fill a valid email",
        ],
      },
      phonenumber: {
        type: String,
        required: "Phone number is required",
        unique: true,
        match: [
          /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
          "Please fill a valid phone number",
        ],
      },
      studentID: {
        type: String,
        required: "Student ID is required",
        unique: true,
      },
      images: [
        {
          type: String,
          required: "Image is required",
        },
      ],
    },
    viceSecretary: {
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
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please fill a valid email",
        ],
      },
      phonenumber: {
        type: String,
        required: "Phone number is required",
        unique: true,
        match: [
          /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
          "Please fill a valid phone number",
        ],
      },
      studentID: {
        type: String,
        required: "Student ID is required",
        unique: true,
      },
      images: [
        {
          type: String,
          required: "Image is required",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

bureauSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Bureau", bureauSchema);
