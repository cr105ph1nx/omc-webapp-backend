/************************************************************************ */
/****                        HOSTING IMAGES                   *********** */
/************************************************************************ */
const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images/events");
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
const eventController = require("../controllers/eventControllers");
const adminController = require("../controllers/adminControllers");

// Getting all events
router.get(
  "/index/:page?",
  adminController.authRequired,
  eventController.index
);

// Getting one event by id
router.get(
  "/getByID/:eventID",
  adminController.authRequired,
  eventController.getEvent,
  eventController.getEventByID
);

// Creating a event
router.post(
  "/",
  adminController.authRequired,
  upload.array("images", 10),
  eventController.createEvent
);

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
