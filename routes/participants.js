const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantControllers");
const adminController = require("../controllers/adminControllers");

// Getting all particiapnts
router.get(
  "/index/:page?",
  adminController.authRequired,
  participantController.index
);

// Getting one participant by id
router.get(
  "/getByID/:participantID",
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

// search for participant
router.post(
  "/search/:page?",
  adminController.authRequired,
  participantController.searchParticipant
);

// Accepting multiple participants
router.post(
  "/accept",
  adminController.authRequired,
  participantController.acceptParticipants
);

// Rejecting multiple participants
router.post(
  "/reject",
  adminController.authRequired,
  participantController.rejectParticipants
);

// Downloading all accepted members
router.post(
  "/downloadAccepted",
  adminController.authRequired,
  participantController.downloadAccepted
);

module.exports = router;
