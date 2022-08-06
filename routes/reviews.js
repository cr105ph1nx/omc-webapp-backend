const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");
const reviewController = require("../controllers/reviewControllers");

// Getting all reviews
router.get(
  "/index/:page?",
  adminController.authRequired,
  reviewController.index
);

// Getting one review by id
router.get(
  "/getByID/:reviewID",
  adminController.authRequired,
  reviewController.getReview,
  reviewController.getReviewByID
);

// Getting reviews of given session ID
router.get(
  "/getByID/:sessionID/:page?",
  adminController.authRequired,
  reviewController.getSessionReviews
);

// Censor given reviews
router.post(
  "/censor",
  adminController.getAdmin,
  reviewController.censorReviews
);

module.exports = router;
