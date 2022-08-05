/************************************************************************ */
/****                        HOSTING IMAGES                   *********** */
/************************************************************************ */
const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images/courses");
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
router.post(
  "/",
  adminController.authRequired,
  upload.array("images", 10),
  courseController.createCourse
);

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
