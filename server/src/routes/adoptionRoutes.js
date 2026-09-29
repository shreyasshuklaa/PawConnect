const express = require("express");

const {
  createAdoptionApplication,
  getOrganizationApplications,
  approveAdoptionApplication,
  rejectAdoptionApplication,
} = require("../controllers/adoptionController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Adopter submits adoption application
router.post(
  "/",
  protect,
  authorizeRoles("adopter"),
  createAdoptionApplication
);

// Organization/Shelter views adoption applications
router.get(
  "/organization",
  protect,
  authorizeRoles("shelter"),
  getOrganizationApplications
);

// Organization/Shelter approves adoption application
router.patch(
  "/:id/approve",
  protect,
  authorizeRoles("shelter"),
  approveAdoptionApplication
);

// Organization/Shelter rejects adoption application
router.patch(
  "/:id/reject",
  protect,
  authorizeRoles("shelter"),
  rejectAdoptionApplication
);


module.exports = router;