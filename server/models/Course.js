const mongoose = require("mongoose");
const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  publicId: String,
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  language: String,
  subtitle: String,
  description: String,
  image: String,
  welcomeMessage: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublished: Boolean,
});
module.exports = mongoose.model("Course", CourseSchema);
