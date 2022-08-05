/************************************************************************ */
/****                        HOSTING IMAGES                   *********** */
/************************************************************************ */
const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images/slideshows");
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname.replace(/ /g, "_"));
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});
/****************************************************************** */

const express = require("express");
const router = express.Router();
const slideshowController = require("../controllers/slideshowControllers");
const adminController = require("../controllers/adminControllers");

// Getting all slideshows
router.get(
  "/index/:page?",
  adminController.authRequired,
  slideshowController.index
);

// Getting one slideshow by id
router.get(
  "/getByID/:slideshowID",
  adminController.authRequired,
  slideshowController.getSlideshow,
  slideshowController.getSlideshowByID
);

// Creating a slideshow
router.post(
  "/",
  adminController.authRequired,
  upload.single("image"),
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
