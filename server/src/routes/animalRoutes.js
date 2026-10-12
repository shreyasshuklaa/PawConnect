const express = require("express");

const {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  getMyAnimals,
} = require("../controllers/animalController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all animals
// Public route - used by Find a Pet
router.get("/", getAnimals);

// Get logged-in shelter's animals
router.get(
  "/my",
  protect,
  authorizeRoles("shelter"),
  getMyAnimals
);

// Get animal by ID
router.get("/:id", getAnimalById);

// Create animal
router.post(
  "/",
  protect,
  authorizeRoles("shelter", "admin"),
  createAnimal
);

// Update animal
router.put(
  "/:id",
  protect,
  authorizeRoles("shelter", "admin"),
  updateAnimal
);

// Delete animal
router.delete(
  "/:id",
  protect,
  authorizeRoles("shelter", "admin"),
  deleteAnimal
);

module.exports = router;