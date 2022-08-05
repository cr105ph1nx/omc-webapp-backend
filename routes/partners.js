/************************************************************************ */
/****                        HOSTING IMAGES                   *********** */
/************************************************************************ */
const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images/partners");
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
const partnerController = require("../controllers/partnerControllers");
const adminController = require("../controllers/adminControllers");

// Getting all partners
router.get("/index/:page?", partnerController.index);

// Getting one partner by id
router.get(
  "/getByID/:partnerID",
  adminController.authRequired,
  partnerController.getPartner,
  partnerController.getPartnerByID
);

// Creating a partner
router.post(
  "/",
  adminController.authRequired,
  upload.single("logo"),
  partnerController.createPartner
);

// Updating a partner
router.patch(
  "/:partnerID",
  adminController.authRequired,
  partnerController.getPartner,
  partnerController.updatePartner
);

// Deleting a partner
router.delete(
  "/:partnerID",
  adminController.authRequired,
  partnerController.getPartner,
  partnerController.deletePartner
);

module.exports = router;
