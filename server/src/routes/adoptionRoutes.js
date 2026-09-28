const express = require("express");

const {
  createAdoptionApplication,
} = require("../controllers/adoptionController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("adopter"),
  createAdoptionApplication
);

module.exports = router;