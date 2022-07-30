const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventControllers");
const adminController = require("../controllers/adminControllers");

// Getting all events
router.get("/:page?", adminController.authRequired, eventController.index);

// Getting one event by id
router.get(
  "/:eventID",
  adminController.authRequired,
  eventController.getEvent,
  eventController.getEventByID
);

// Creating a event
router.post("/", adminController.authRequired, eventController.createEvent);

// Updating a event
router.patch(
  "/:eventID",
  adminController.authRequired,
  eventController.getEvent,
  eventController.updateEvent
);

// Deleting a event
router.delete(
  "/:eventID",
  adminController.authRequired,
  eventController.getEvent,
  eventController.deleteEvent
);

// Search for event
router.post(
  "/search/:page?",
  adminController.authRequired,
  eventController.searchEvent
);

module.exports = router;
