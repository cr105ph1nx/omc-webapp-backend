const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberControllers");
const adminController = require("../controllers/adminControllers");

// Getting all members
router.get("/:page?", adminController.authRequired, memberController.index);

// Getting one member by id
router.get(
  "/:memberID",
  adminController.authRequired,
  memberController.getMember,
  memberController.getMemberByID
);

// Creating a member
router.post("/", memberController.createMember);

// Updating a member
router.patch(
  "/:memberID",
  adminController.authRequired,
  memberController.getMember,
  memberController.updateMember
);

// Deleting a member
router.delete(
  "/:memberID",
  adminController.authRequired,
  memberController.getMember,
  memberController.deleteMember
);

// Getting one member by id
router.post(
  "/search/:page?",
  adminController.authRequired,
  memberController.searchMember
);

// Accepting multiple members
router.post(
  "/accept",
  adminController.authRequired,
  memberController.acceptMembers
);

// Rejecting multiple members
router.post(
  "/reject",
  adminController.authRequired,
  memberController.rejectMembers
);
module.exports = router;
