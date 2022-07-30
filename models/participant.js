const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const participantSchema = mongoose.Schema(
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
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email"],
    },
    phonenumber: {
      type: String,
      required: "Phone number is required",
      match: [
        /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
        "Please fill a valid phone number",
      ],
    },
    studentID: {
      type: String,
      required: "Student ID is required",
    },
    establishment: {
      type: String,
      required: "Establishement is required",
      match: [
        /USTHB|ESI|ENP|ESSA|ENSTP|Autre|Other/,
        "Please fill a valid establishment",
      ],
    },
    level: {
      type: String,
      required: "Level is required",
      match: [
        /L1|L2|L3|M1|M2|D|CP1|CP2|CS1|CS2|CS3|Autre|Other/,
        "Please fill a valid level",
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

participantSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Participant", participantSchema);
