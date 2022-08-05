/************************************************************************ */
/****                        HOSTING IMAGES                   *********** */
/************************************************************************ */
const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images/bureaux");
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
router.post(
  "/",
  adminController.authRequired,
  upload.fields([
    {
      name: "presidentImages",
      maxCount: 2,
    },
    {
      name: "vicePresidentImages",
      maxCount: 2,
    },
    {
      name: "secretaryImages",
      maxCount: 2,
    },
    {
      name: "viceSecretaryImages",
      maxCount: 2,
    },
  ]),
  bureauController.getBureauImages,
  bureauController.createBureau
);

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
