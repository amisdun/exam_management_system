const express = require("express")
const lecturer_halls = require("../API/lecturer_hallsAPI")

const router = express.Router()

router.get("/all", lecturer_halls.get_all_halls)
router.patch("/:id", lecturer_halls.update_hall)
router.get("/one_hall/:id", lecturer_halls.get_one_hall)
router.delete("/:id", lecturer_halls.delete_hall)
router.post("/create", lecturer_halls.add_lecturer_hall)

module.exports = router