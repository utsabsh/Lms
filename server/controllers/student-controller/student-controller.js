const Course = require("../../models/Course");
const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;

        break;
      case "price-hightolow":
        sortParam.pricing = -1;

        break;
      case "title-atoz":
        sortParam.title = 1;

        break;
      case "title-ztoa":
        sortParam.title = -1;

        break;

      default:
        sortParam.pricing = 1;
        break;
    }

    const courseList = await Course.find(filters).sort(sortParam);

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
