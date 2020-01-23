const express = require("express")
const router = express.Router();

let lecturer_detail = require("../API/lecturer_detailsAPI")

router.get("/all",lecturer_detail.read_lecturer_detail)
router.get("/:id",lecturer_detail.read_single)
router.delete("/:id",lecturer_detail.delete_one)
router.post("/create",lecturer_detail.create_lecturer)
router.patch("/:id",lecturer_detail.update)

module.exports = router