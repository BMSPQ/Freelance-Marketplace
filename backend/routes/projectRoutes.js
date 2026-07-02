const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createProject,
  getAllProjects,
  getMyProjects,
  deleteProject,
  updateProject,
  getProjectById,
  completeProject,
  closeProject,
} = require("../controllers/projectController");

// Only CLIENT can create projects
router.post(
  "/",
  verifyToken,
  authorizeRoles("client"),
  createProject
);

// Any logged-in user can browse projects
router.get("/", verifyToken, getAllProjects);

// Only CLIENT can view their own projects
router.get(
  "/my-projects",
  verifyToken,
  authorizeRoles("client"),
  getMyProjects
);

// View Single Project
router.get(
  "/:id",
  verifyToken,
  getProjectById
);

// Update Project
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("client"),
  updateProject
);

// Mark Project as Completed
router.put(
  "/:id/complete",
  verifyToken,
  authorizeRoles("client"),
  completeProject
);

// Close Project
router.put(
  "/:id/close",
  verifyToken,
  authorizeRoles("client"),
  closeProject
);

// Delete Project
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("client"),
  deleteProject
);

module.exports = router;