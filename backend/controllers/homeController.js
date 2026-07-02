const Project = require("../models/Project");
const User = require("../models/User");
const Bid = require("../models/Bid");

// ======================================
// Home Page Data
// ======================================
const getHomeData = async (req, res) => {
  try {

    // Statistics
    const totalProjects = await Project.countDocuments();

    const totalFreelancers = await User.countDocuments({
      role: "freelancer",
    });

    const totalClients = await User.countDocuments({
      role: "client",
    });

    const totalBids = await Bid.countDocuments();

    // Latest Open Projects
    const latestProjects = await Project.find({
      status: "Open",
    })
      .populate("client", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    // Featured Freelancers
    const featuredFreelancers = await User.find({
      role: "freelancer",
    })
      .select(
        "name skills experience profileImage location hourlyRate"
      )
      .limit(6);

    // Categories
    const categoriesList = [
      "Web Development",
      "App Development",
      "UI / UX Design",
      "Graphic Design",
      "Content Writing",
      "Digital Marketing",
      "Data Analysis",
      "AI & Machine Learning",
      "Database Management",
      "Cloud Computing",
    ];

    const categories = await Promise.all(
      categoriesList.map(async (category) => {

        const count = await Project.countDocuments({
          category,
        });

        return {
          name: category,
          count,
        };

      })
    );

    res.status(200).json({
      success: true,

      statistics: {
        totalProjects,
        totalFreelancers,
        totalClients,
        totalBids,
      },

      latestProjects,

      featuredFreelancers,

      categories,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getHomeData,
};