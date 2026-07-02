const User = require("../models/User");
const Project = require("../models/Project");
const Bid = require("../models/Bid");

// ======================================
// Get Public User Profile
// ======================================
const getFreelancerProfile = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Client Statistics
    const totalProjects = await Project.countDocuments({
      client: user._id,
    });

    const activeProjects = await Project.countDocuments({
      client: user._id,
      status: "Open",
    });

    const inProgressProjects = await Project.countDocuments({
      client: user._id,
      status: "In Progress",
    });

    const completedProjects = await Project.countDocuments({
      client: user._id,
      status: "Completed",
    });

    // Freelancer Statistics
    const totalBids = await Bid.countDocuments({
      freelancer: user._id,
    });

    const acceptedBids = await Bid.countDocuments({
      freelancer: user._id,
      status: "Accepted",
    });

    const pendingBids = await Bid.countDocuments({
      freelancer: user._id,
      status: "Pending",
    });

    const rejectedBids = await Bid.countDocuments({
      freelancer: user._id,
      status: "Rejected",
    });

    res.status(200).json({
      success: true,
      user,

      statistics: {
        totalProjects,
        activeProjects,
        inProgressProjects,
        completedProjects,

        totalBids,
        acceptedBids,
        pendingBids,
        rejectedBids,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getFreelancerProfile,
};