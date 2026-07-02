const Project = require("../models/Project");
const Bid = require("../models/Bid");

// ======================================
// Client Dashboard
// ======================================
const getClientDashboard = async (req, res) => {
  try {

    const totalProjects = await Project.countDocuments({
      client: req.user.id,
    });

    const openProjects = await Project.countDocuments({
      client: req.user.id,
      status: "Open",
    });

    const inProgressProjects = await Project.countDocuments({
      client: req.user.id,
      status: "In Progress",
    });

    const completedProjects = await Project.countDocuments({
      client: req.user.id,
      status: "Completed",
    });

    const totalReceivedBids = await Bid.countDocuments({
      project: {
        $in: await Project.find({ client: req.user.id }).distinct("_id"),
      },
    });

    res.status(200).json({
      success: true,
      totalProjects,
      openProjects,
      inProgressProjects,
      completedProjects,
      totalReceivedBids,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Freelancer Dashboard
// ======================================
const getFreelancerDashboard = async (req, res) => {
  try {

    const totalBids = await Bid.countDocuments({
      freelancer: req.user.id,
    });

    const acceptedBids = await Bid.countDocuments({
      freelancer: req.user.id,
      status: "Accepted",
    });

    const pendingBids = await Bid.countDocuments({
      freelancer: req.user.id,
      status: "Pending",
    });

    const rejectedBids = await Bid.countDocuments({
      freelancer: req.user.id,
      status: "Rejected",
    });

    const activeProjects = await Bid.countDocuments({
      freelancer: req.user.id,
      status: "Accepted",
    });

    res.status(200).json({
      success: true,
      totalBids,
      acceptedBids,
      pendingBids,
      rejectedBids,
      activeProjects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getClientDashboard,
  getFreelancerDashboard,
};