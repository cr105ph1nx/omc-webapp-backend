const passport = require("passport");
const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestControllers");
require("../auth.js");

// sending emails
router.post("/contact", guestController.sendContactEmail);
router.post("/suggest", guestController.sendSuggestionEmail);

// handle google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// handle google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/guests/addReview",
    failureRedirect: "/guests/authFailure",
  })
);

// adding review after google authentication
router.get(
  "/addReview/:sessionType?/:sessionID?/:rating?/:title?/:description?",
  guestController.authRequired,
  guestController.addReview
);

// handling authentication failure
router.post("/authFailure", guestController.authFailure);

module.exports = router;
