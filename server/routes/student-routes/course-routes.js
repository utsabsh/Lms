const express = require("express");
const {
  getAllStudentViewCourses,
  getStudentViewCoursesDetails,
} = require("../../controllers/student-controller/student-controller");
const router = express.Router();
router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCoursesDetails);
module.exports = router;
