const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantControllers");
const adminController = require("../controllers/adminControllers");

// Getting all particiapnts
router.get(
  "/:page?",
  adminController.authRequired,
  participantController.index
);

// Getting one participant by id
router.get(
  "/:participantID",
  adminController.authRequired,
  participantController.getParticipant,
  participantController.getParticipantByID
);

// Creating a participant
router.post("/", participantController.createParticipant);

// Updating a participant
router.patch(
  "/:participantID",
  adminController.authRequired,
  participantController.getParticipant,
  participantController.updateParticipant
);

// Deleting a participant
router.delete(
  "/:participantID",
  adminController.authRequired,
  participantController.getParticipant,
  participantController.deleteParticipant
);

// Getting one participant by id
router.post(
  "/search/:page?",
  adminController.authRequired,
  participantController.searchParticipant
);

module.exports = router;
