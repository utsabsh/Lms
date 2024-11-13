const Course = require("../../models/Course");
const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();
    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course Saved successfully!",
        data: saveCourse,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some Error occured while adding the course!",
    });
  }
};

const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    if (courseDetails) {
      res.status(200).json({
        success: true,
        message: "Course Details Fetched Successfully",
        data: courseDetails,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some Error occured while fetching the course details!",
    });
  }
};
const getAllCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});
    res.status(200).json({
      success: true,
      message: "Courses List",
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some Error occured while fetching the course!",
    });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );
    if (!updatedCourse) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some Error occured while updating the course!",
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseById,
  getCourseDetailsById,
};
