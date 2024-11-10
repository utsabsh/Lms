const express = require("express");
const multer = require("multer");
const {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} = require("../../helpers/cloudinary");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
//upload media
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({ success: true, data: result });
  } catch (e) {
    console.log(e);

    res
      .status(500)
      .json({ success: false, message: "Error uploading to cloudinary" });
  }
});
//Delete media
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }
    await deleteMediaFromCloudinary(id);
    res
      .status(200)
      .json({ success: true, message: "Media deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error deleting media" });
  }
});

module.exports = router;