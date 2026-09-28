const express = require("express");

const {
  registerOrganization,
  getMyOrganization,
  getPendingOrganizations,
  approveOrganization,
  rejectOrganization,
} = require("../controllers/organizationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("shelter"),
  registerOrganization
);
router.get(
  "/my",
  protect,
  authorizeRoles("shelter"),
  getMyOrganization
);

router.get(
  "/pending",
  protect,
  authorizeRoles("admin"),
  getPendingOrganizations
);


router.put(
  "/:id/approve",
  protect,
  authorizeRoles("admin"),
  approveOrganization
);

router.put(
  "/:id/reject",
  protect,
  authorizeRoles("admin"),
  rejectOrganization
);


module.exports = router;