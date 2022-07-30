const express = require("express");
const router = express.Router();
const slideshowController = require("../controllers/slideshowControllers");
const adminController = require("../controllers/adminControllers");

// Getting all slideshows
router.get("/:page?", adminController.authRequired, slideshowController.index);

// Getting one slideshow by id
router.get(
  "/:slideshowID",
  adminController.authRequired,
  slideshowController.getSlideshow,
  slideshowController.getSlideshowByID
);

// Creating a slideshow
router.post(
  "/",
  adminController.authRequired,
  slideshowController.createSlideshow
);

// Updating a slideshow
router.patch(
  "/:slideshowID",
  adminController.authRequired,
  slideshowController.getSlideshow,
  slideshowController.updateSlideshow
);

// Deleting a slideshow
router.delete(
  "/:slideshowID",
  adminController.authRequired,
  slideshowController.getSlideshow,
  slideshowController.deleteSlideshow
);

// Search for slideshow
router.post(
  "/search/:page?",
  adminController.authRequired,
  slideshowController.searchSlideshow
);

module.exports = router;
