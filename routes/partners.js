const express = require("express");
const router = express.Router();
const partnerController = require("../controllers/partnerControllers");
const adminController = require("../controllers/adminControllers");

// Getting all partners
router.get("/:page?", partnerController.index);

// Getting one partner by id
router.get(
  "/:partnerID",
  adminController.authRequired,
  partnerController.getPartner,
  partnerController.getPartnerByID
);

// Creating a partner
router.post("/", partnerController.createPartner);

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
