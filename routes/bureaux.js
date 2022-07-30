const express = require("express");
const router = express.Router();
const bureauController = require("../controllers/bureauControllers");
const adminController = require("../controllers/adminControllers");

// Getting all bureaux
router.get("/:page?", adminController.authRequired, bureauController.index);

// Getting one bureau by id
router.get(
  "/:bureauID",
  adminController.authRequired,
  bureauController.getBureau,
  bureauController.getBureauByID
);

// Creating a bureau
router.post("/", adminController.authRequired, bureauController.createBureau);

// Updating a bureau
router.patch(
  "/:bureauID",
  adminController.authRequired,
  bureauController.getBureau,
  bureauController.updateBureau
);

// Deleting a bureau
router.delete(
  "/:bureauID",
  adminController.authRequired,
  bureauController.getBureau,
  bureauController.deleteBureau
);

module.exports = router;
