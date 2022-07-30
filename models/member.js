const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const memberSchema = mongoose.Schema(
  {
    isAccepted: {
      type: Boolean,
      default: false,
    },
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
    level: {
      type: String,
      required: "Level is required",
      match: [/L1|L2|L3|M1|M2|D/, "Please fill a valid level"],
    },
    faculty: {
      type: String,
      required: "Faculty name is required",
      match: [
        /ST|SNV|SM|STU|Math|Informatique|Electronique|Physique|Chimie|GC|GM|GP||Biologie|GAT|Geologie|Autre/,
        "Please fill a valid faculty name",
      ],
    },
    motivation: {
      type: String,
      required: "Motivation name is required",
    },
    team: {
      type: String,
      required: "Team choice is required",
      match: [
        /IT|Marketing|Design|B2B|HR|OMCast|OpenWiki/,
        "Please fill a valid team choice",
      ],
    },
    experience: {
      type: String,
      required: "Experience is required",
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Member", memberSchema);
