const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

// Getting all admins
router.get("/:page?", adminController.authRequired, adminController.index);

// Getting one admin by id
router.get(
  "/:adminID",
  adminController.authRequired,
  adminController.getAdmin,
  adminController.getAdminByID
);

// Creating an admin
router.post("/", adminController.authRequired, adminController.createAdmin);

// Updating an admin
router.patch(
  "/:adminID",
  adminController.getAdmin,
  adminController.authRequired,
  adminController.updateAdmin
);

// Deleting an admin
router.delete(
  "/:adminID",
  adminController.getAdmin,
  adminController.authRequired,
  adminController.deleteAdmin
);

// Login
router.post("/login", adminController.loginValidation);

module.exports = router;
