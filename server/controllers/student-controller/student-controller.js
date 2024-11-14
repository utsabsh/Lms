const Course = require("../../models/Course");
const getAllStudentViewCourses = async (req, res) => {
  try {
    const courseList = await Course.find({});
    if (courseList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found", data: [] });
    }

    res.status(200).json({ success: true, data: courseList });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured while getAllStudentCourses ",
    });
  }
};
const getStudentViewCoursesDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No courses details found",
        data: [],
      });
    }
    res.status(200).json({ success: true, data: courseDetails });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured while getAllStudentCourses ",
    });
  }
};
module.exports = { getAllStudentViewCourses, getStudentViewCoursesDetails };
