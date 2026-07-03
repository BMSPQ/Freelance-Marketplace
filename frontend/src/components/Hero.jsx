import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Hero({
  statistics = {
    totalProjects: 0,
    totalFreelancers: 0,
    totalClients: 0,
    totalBids: 0,
  },
}) {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <section
      className="text-white"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-lg-6">

            <span className="badge bg-warning text-dark fs-6 mb-3">
              🚀 Trusted Freelance Marketplace
            </span>

            <h1 className="display-3 fw-bold mb-4">
              Find the Perfect Freelancer
              <br />
              for Your Business
            </h1>

            <p className="lead mb-4">
              Connect with skilled developers, designers, writers,
              marketers, and professionals. Post projects, receive bids,
              and hire the best talent with confidence.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3">

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="btn btn-warning btn-lg px-4"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/projects"
                    className="btn btn-outline-light btn-lg px-4"
                  >
                    Browse Projects
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="btn btn-warning btn-lg px-4"
                  >
                    Dashboard
                  </Link>

                  {user?.role === "client" ? (
                    <Link
                      to="/create-project"
                      className="btn btn-outline-light btn-lg px-4"
                    >
                      Create Project
                    </Link>
                  ) : (
                    <Link
                      to="/projects"
                      className="btn btn-outline-light btn-lg px-4"
                    >
                      Browse Projects
                    </Link>
                  )}
                </>
              )}

            </div>

            {/* Statistics */}
            <div className="row mt-5 text-center">

              <div className="col-3">
                <h2 className="fw-bold">
                  {statistics.totalProjects}
                </h2>
                <small>Projects</small>
              </div>

              <div className="col-3">
                <h2 className="fw-bold">
                  {statistics.totalFreelancers}
                </h2>
                <small>Freelancers</small>
              </div>

              <div className="col-3">
                <h2 className="fw-bold">
                  {statistics.totalClients}
                </h2>
                <small>Clients</small>
              </div>

              <div className="col-3">
                <h2 className="fw-bold">
                  {statistics.totalBids}
                </h2>
                <small>Bids</small>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="col-lg-6 text-center mt-5 mt-lg-0">

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
              alt="Freelancers"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: "500px" }}
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
