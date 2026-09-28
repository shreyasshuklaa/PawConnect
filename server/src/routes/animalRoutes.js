const express = require("express");

const {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} = require("../controllers/animalController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all animals
router.get("/", getAnimals);
router.get("/:id", getAnimalById);

// Create animal
router.post(
  "/",
  protect,
  authorizeRoles("shelter", "admin"),
  createAnimal
);
router.put(
  "/:id",
  protect,
  authorizeRoles("shelter", "admin"),
  updateAnimal
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("shelter", "admin"),
  deleteAnimal
);

module.exports = router;