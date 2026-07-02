import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

import {
  FaUserTie,
  FaPlus,
  FaSearch,
  FaClipboardList,
  FaUserCircle,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  setLoading(true);

  try {
    // Get logged-in user
    const profileRes = await API.get("/auth/profile");
    setUser(profileRes.data.user);

    // Get dashboard statistics
    if (profileRes.data.user.role === "client") {
      const dashboardRes = await API.get("/dashboard/client");
      setStats(dashboardRes.data);
    } else {
      const dashboardRes = await API.get("/dashboard/freelancer");
      setStats(dashboardRes.data);
    }

  } catch (error) {
    console.log(error);
    toast.error("Failed to load dashboard");
  } finally {
    setLoading(false);
  }
};

  if (loading) {
  return (
    <div className="container mt-5 text-center">
      <h3>Loading Dashboard...</h3>
    </div>
  );
}

  return (
  <div className="container py-5">

    <div className="text-center mb-5">
      <FaUserCircle
        size={90}
        className="text-primary mb-3"
      />

      <h2 className="fw-bold">
        Welcome, {user.name} 👋
      </h2>

      <span className="badge bg-dark fs-6">
        {user.role.toUpperCase()}
      </span>
    </div>

    {/* Statistics */}

    <div className="row">

      {user.role === "client" ? (
        <>
          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3">
              <h5>Total Projects</h5>
              <h2>{stats.totalProjects}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3">
              <h5>Open Projects</h5>
              <h2>{stats.openProjects}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3">
              <h5>In Progress</h5>
              <h2>{stats.inProgressProjects}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3">
              <h5>Completed</h5>
              <h2>{stats.completedProjects}</h2>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3">
              <h5>Total Bids</h5>
              <h2>{stats.totalBids}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3">
              <h5>Accepted</h5>
              <h2>{stats.acceptedBids}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3">
              <h5>Pending</h5>
              <h2>{stats.pendingBids}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3">
              <h5>Rejected</h5>
              <h2>{stats.rejectedBids}</h2>
            </div>
          </div>
        </>
      )}

    </div>

    {/* Quick Actions */}

    <div className="card shadow border-0 mt-4">
      <div className="card-body">

        <h4 className="mb-4">
          Quick Actions
        </h4>

        <div className="d-flex flex-wrap gap-3">

          {user.role === "client" ? (
            <>
              <Link
                to="/create-project"
                className="btn btn-primary"
              >
                <FaPlus className="me-2" />
                Create Project
              </Link>

              <Link
                to="/my-projects"
                className="btn btn-success"
              >
                <FaClipboardList className="me-2" />
                My Projects
              </Link>
            </>
          ) : (
            <Link
              to="/my-bids"
              className="btn btn-success"
            >
              <FaClipboardList className="me-2" />
              My Bids
            </Link>
          )}

          <Link
            to="/projects"
            className="btn btn-dark"
          >
            <FaSearch className="me-2" />
            Browse Projects
          </Link>

          <Link
            to="/profile"
            className="btn btn-warning"
          >
            <FaUserTie className="me-2" />
            My Profile
          </Link>

          <button
            className="btn btn-secondary"
            onClick={fetchData}
          >
            Refresh
          </button>

        </div>

      </div>
    </div>

    {/* Profile Summary */}

    <div className="card shadow border-0 mt-4">

      <div className="card-body">

        <h3 className="mb-4">
          Profile Summary
        </h3>

        <div className="row">

          <div className="col-md-6">

            <p><strong>Name:</strong> {user.name}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <p>
              <FaMapMarkerAlt className="me-2 text-danger" />
              {user.location || "Not Added"}
            </p>

          </div>

          <div className="col-md-6">

            <p>
              <strong>Experience:</strong> {user.experience} Years
            </p>

            <p>
              <FaDollarSign className="me-2 text-success" />
              ₹{user.hourlyRate || 0}/hour
            </p>

          </div>

        </div>

        <hr />

        <h5>Skills</h5>

        {user.skills?.length > 0 ? (
          user.skills.map((skill) => (
            <span
              key={skill}
              className="badge bg-primary me-2 mb-2"
            >
              {skill}
            </span>
          ))
        ) : (
          <p>No Skills Added</p>
        )}

        <hr />

        <h5>About</h5>

        <p className="text-muted">
          {user.bio || "No bio added yet."}
        </p>

      </div>

    </div>

  </div>
);
}
export default Dashboard;