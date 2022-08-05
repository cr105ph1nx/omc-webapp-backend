const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestControllers");

// sending emails
router.post("/contact", guestController.sendContactEmail);
router.post("/suggest", guestController.sendSuggestionEmail);

module.exports = router;
