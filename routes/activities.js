/************************************************************************ */
/****                        HOSTING IMAGES                   *********** */
/************************************************************************ */
const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images/activities");
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
const activityController = require("../controllers/activityControllers");
const adminController = require("../controllers/adminControllers");

// Getting all activities
router.get(
  "/index/:page?",
  adminController.authRequired,
  activityController.index
);

// Getting one activity by id
router.get(
  "/getByID/:activityID",
  adminController.authRequired,
  activityController.getActivity,
  activityController.getActivityByID
);

// Creating a activity
router.post(
  "/",
  adminController.authRequired,
  upload.array("images", 10),
  activityController.createActivity
);

// Updating a activity
router.patch(
  "/:activityID",
  adminController.authRequired,
  activityController.getActivity,
  upload.array("images", 10),
  activityController.updateActivity
);

// Deleting a activity
router.delete(
  "/:activityID",
  adminController.authRequired,
  activityController.getActivity,
  activityController.deleteActivity
);

// Search for activity
router.post(
  "/search/:page?",
  adminController.authRequired,
  activityController.searchActivity
);

module.exports = router;
