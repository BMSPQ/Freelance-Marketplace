const Project = require("../models/Project");
const Bid = require("../models/Bid");

// ======================================
// Create Project
// ======================================
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      budget,
      deadline,
      skills,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !budget ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const project = await Project.create({
      title,
      description,
      category,
      budget,
      deadline,
      skills,
      client: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Projects
// ======================================
const getAllProjects = async (req, res) => {
  try {

    const projects = await Project.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My Projects
// ======================================
const getMyProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      client: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Project
// ======================================
const getProjectById = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id)
      .populate("client", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const totalBids = await Bid.countDocuments({
      project: project._id,
    });

    res.status(200).json({
      success: true,
      project,
      totalBids,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Project
// ======================================
const updateProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("client", "name email");

    res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      project: updatedProject,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Project
// ======================================
const deleteProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Bid.deleteMany({
      project: project._id,
    });

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Complete Project
// ======================================
const completeProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    project.status = "Completed";
    await project.save();

    res.status(200).json({
      success: true,
      message: "Project marked as Completed",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Close Project
// ======================================
const closeProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    project.status = "Completed";

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project Closed Successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
  completeProject,
  closeProject,
};