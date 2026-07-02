import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaBriefcase,
  FaProjectDiagram,
  FaCheckCircle,
  FaGavel,
  FaDollarSign,
  FaSync,
} from "react-icons/fa";

function FreelancerProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const res = await API.get(`/users/${id}`);

      setUser(res.data.user);
      setStatistics(res.data.statistics);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load freelancer profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Freelancer Profile...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h3>Freelancer not found.</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={fetchProfile}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card shadow border-0">

        <div className="card-body p-5">

          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={fetchProfile}
            >
              <FaSync className="me-2" />
              Refresh
            </button>
          </div>

          <div className="row">

            {/* Left Side */}

            <div className="col-lg-4 text-center">

              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="rounded-circle mb-3 border border-3 border-primary"
                  width="180"
                  height="180"
                />
              ) : (
                <FaUserCircle
                  size={180}
                  className="text-secondary mb-3"
                />
              )}

              <h2>{user.name}</h2>

              <span className="badge bg-primary fs-6">
                {user.role.toUpperCase()}
              </span>

            </div>

            {/* Right Side */}

            <div className="col-lg-8">

              <h4>About</h4>

              <p className="text-muted">
                {user.bio || "No bio available."}
              </p>

              <hr />

              <div className="row">

                <div className="col-md-6 mb-3">
                  <FaMapMarkerAlt className="me-2 text-danger" />
                  {user.location || "Not Added"}
                </div>

                <div className="col-md-6 mb-3">
                  <FaBriefcase className="me-2 text-primary" />
                  {user.experience} Years Experience
                </div>

                <div className="col-md-6 mb-3">
                  <FaDollarSign className="me-2 text-success" />
                  ₹{user.hourlyRate || 0}/hour
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Email:</strong> {user.email}
                </div>

              </div>

              <hr />

              <h5>Skills</h5>

              <div className="mb-4">

                {user.skills?.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge bg-primary me-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>No Skills Added</p>
                )}

              </div>

              <hr />

              <h5>Statistics</h5>

              <div className="row">

                <div className="col-md-3 text-center">
                  <FaProjectDiagram
                    size={35}
                    className="text-primary"
                  />
                  <h4>{statistics?.totalProjects || 0}</h4>
                  <small>Total Projects</small>
                </div>

                <div className="col-md-3 text-center">
                  <FaCheckCircle
                    size={35}
                    className="text-success"
                  />
                  <h4>{statistics?.completedProjects || 0}</h4>
                  <small>Completed</small>
                </div>

                <div className="col-md-3 text-center">
                  <FaGavel
                    size={35}
                    className="text-warning"
                  />
                  <h4>{statistics?.totalBids || 0}</h4>
                  <small>Total Bids</small>
                </div>

                <div className="col-md-3 text-center">
                  <FaCheckCircle
                    size={35}
                    className="text-info"
                  />
                  <h4>{statistics?.acceptedBids || 0}</h4>
                  <small>Accepted</small>
                </div>

              </div>

              <hr />

              <h5>Portfolio Links</h5>

              <div className="d-flex gap-4 mt-3">

                {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub size={35} />
                  </a>
                )}

                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin
                      size={35}
                      className="text-primary"
                    />
                  </a>
                )}

                {user.portfolio && (
                  <a
                    href={user.portfolio}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGlobe
                      size={35}
                      className="text-success"
                    />
                  </a>
                )}

                {!user.github &&
                  !user.linkedin &&
                  !user.portfolio && (
                    <p className="text-muted">
                      No Portfolio Links Added
                    </p>
                  )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FreelancerProfile;