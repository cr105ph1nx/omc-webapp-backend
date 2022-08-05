const express = require("express");
const router = express.Router();
const bureauController = require("../controllers/bureauControllers");
const adminController = require("../controllers/adminControllers");

// Getting all bureaux
router.get(
  "/index/:page?",
  adminController.authRequired,
  bureauController.index
);

// Getting current bureau
router.post(
  "/current",
  adminController.authRequired,
  bureauController.getCurrentBureau
);

// Getting one bureau by id
router.get(
  "/getByID/:bureauID",
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

// Setting current year visible
router.post(
  "/setVisible",
  adminController.authRequired,
  bureauController.setBureauVisible
);

module.exports = router;
