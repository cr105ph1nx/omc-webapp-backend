const express = require("express");
const router = express.Router();
const hostController = require("../controllers/hostControllers");
const adminController = require("../controllers/adminControllers");

// Getting all hosts
router.get("/index/:page?", adminController.authRequired, hostController.index);

// Getting one host by id
router.get(
  "/getByID/:hostID",
  adminController.authRequired,
  hostController.getHost,
  hostController.getHostByID
);

// Creating a host
router.post("/", adminController.authRequired, hostController.createHost);

// Updating a host
router.patch(
  "/:hostID",
  adminController.authRequired,
  hostController.getHost,
  hostController.updateHost
);

// Deleting a host
router.delete(
  "/:hostID",
  adminController.authRequired,
  hostController.getHost,
  hostController.deleteHost
);

// Search for host
router.post(
  "/search/:page?",
  adminController.authRequired,
  hostController.searchHost
);

// Add new session to host
router.post(
  "/addSession/:hostID",
  adminController.authRequired,
  hostController.getHost,
  hostController.addSession
);

// Remvove session from host
router.post(
  "/removeSession/:hostID",
  adminController.authRequired,
  hostController.getHost,
  hostController.removeSession
);

module.exports = router;
