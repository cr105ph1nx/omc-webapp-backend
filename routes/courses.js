const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseControllers");
const adminController = require("../controllers/adminControllers");

// Getting all courses
router.get(
  "/index/:page?",
  adminController.authRequired,
  courseController.index
);

// Getting one course by id
router.get(
  "/getByID/:courseID",
  adminController.authRequired,
  courseController.getCourse,
  courseController.getCourseByID
);

// Creating a course
router.post("/", adminController.authRequired, courseController.createCourse);

// Updating a course
router.patch(
  "/:courseID",
  adminController.authRequired,
  courseController.getCourse,
  courseController.updateCourse
);

// Deleting a course
router.delete(
  "/:courseID",
  adminController.authRequired,
  courseController.getCourse,
  courseController.deleteCourse
);

// Search for course
router.post(
  "/search/:page?",
  adminController.authRequired,
  courseController.searchCourse
);

module.exports = router;
