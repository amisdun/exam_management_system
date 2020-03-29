const express = require("express")
const router = express.Router();

let lecturer_detail = require("../API/lecturer_detailsAPI")

router.get("/all",lecturer_detail.read_lecturer_detail)
router.get("/:id",lecturer_detail.read_single)
router.delete("/:id",lecturer_detail.delete_one)
router.post("/create",lecturer_detail.create_lecturer)
router.patch("/:id",lecturer_detail.update)
router.put("/add_course_code/:id", lecturer_detail.add_course_code)
router.delete("/delete_course_code/:id", lecturer_detail.delete_single_course_code)

module.exports = router