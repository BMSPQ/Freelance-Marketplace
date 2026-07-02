const Bid = require("../models/Bid");
const Project = require("../models/Project");

// =============================
// Place Bid
// =============================
const placeBid = async (req, res) => {
  try {
    const { amount, deliveryTime, proposal } = req.body;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.status !== "Open") {
      return res.status(400).json({
        success: false,
        message: "Project is not open for bidding",
      });
    }

    const alreadyBid = await Bid.findOne({
      project: req.params.projectId,
      freelancer: req.user.id,
    });

    if (alreadyBid) {
      return res.status(400).json({
        success: false,
        message: "You have already placed a bid on this project",
      });
    }

    const bid = await Bid.create({
      project: req.params.projectId,
      freelancer: req.user.id,
      amount,
      deliveryTime,
      proposal,
    });

    res.status(201).json({
      success: true,
      message: "Bid Submitted Successfully",
      bid,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Project Bids
// =============================
const getProjectBids = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const bids = await Bid.find({
      project: req.params.projectId,
    })
      .populate("freelancer", "name email skills experience")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bids.length,
      bids,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Accept Bid
// =============================
const acceptBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    const project = await Project.findById(bid.project);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    bid.status = "Accepted";
    await bid.save();

    await Bid.updateMany(
      {
        project: bid.project,
        _id: { $ne: bid._id },
      },
      {
        status: "Rejected",
      }
    );

    project.status = "In Progress";
    await project.save();

    res.status(200).json({
      success: true,
      message: "Bid Accepted Successfully",
      bid,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Reject Bid
// =============================
const rejectBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    const project = await Project.findById(bid.project);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    bid.status = "Rejected";
    await bid.save();

    res.status(200).json({
      success: true,
      message: "Bid Rejected Successfully",
      bid,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// My Bids
// =============================
const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({
      freelancer: req.user.id,
    })
      .populate("project", "title category budget status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bids.length,
      bids,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeBid,
  getProjectBids,
  acceptBid,
  rejectBid,
  getMyBids,
};