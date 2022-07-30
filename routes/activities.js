const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityControllers");
const adminController = require("../controllers/adminControllers");

// Getting all activities
router.get("/:page?", adminController.authRequired, activityController.index);

// Getting one activity by id
router.get(
  "/:activityID",
  adminController.authRequired,
  activityController.getActivity,
  activityController.getActivityByID
);

// Creating a activity
router.post(
  "/",
  adminController.authRequired,
  activityController.createActivity
);

// Updating a activity
router.patch(
  "/:activityID",
  adminController.authRequired,
  activityController.getActivity,
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
