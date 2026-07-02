import { Link } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTools,
  FaUser,
} from "react-icons/fa";

function LatestProjects({ projects = [] }) {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Latest Projects
          </h2>

          <p className="text-muted">
            Explore the latest projects posted by our clients.
          </p>
        </div>

        <div className="row">

          {projects.length === 0 ? (

            <div className="text-center">
              <h4>No Open Projects Available</h4>
            </div>

          ) : (

            projects.map((project) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={project._id}
              >

                <div
                  className="card border-0 shadow h-100"
                  style={{
                    borderRadius: "18px",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >

                  <div className="card-body d-flex flex-column">

                    <span className="badge bg-primary mb-3 align-self-start">
                      {project.category}
                    </span>

                    <h4 className="fw-bold">
                      {project.title}
                    </h4>

                    <p className="text-muted">
                      {project.description?.length > 80
                        ? project.description.substring(0, 80) + "..."
                        : project.description}
                    </p>

                    <hr />

                    <p>
                      <FaMoneyBillWave className="text-success me-2" />
                      <strong>Budget:</strong> ₹{project.budget}
                    </p>

                    <p>
                      <FaTools className="text-primary me-2" />
                      <strong>Skills:</strong>{" "}
                      {project.skills?.length
                        ? project.skills.join(", ")
                        : "Not Specified"}
                    </p>

                    <p>
                      <FaCalendarAlt className="text-danger me-2" />
                      <strong>Deadline:</strong>{" "}
                      {new Date(project.deadline).toLocaleDateString()}
                    </p>

                    <p>
                      <FaUser className="text-secondary me-2" />
                      <strong>Client:</strong>{" "}
                      {project.client?.name || "Unknown"}
                    </p>

                    <Link
                      to={`/projects/${project._id}`}
                      className="btn btn-success mt-auto w-100"
                    >
                      View Project
                    </Link>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </section>
  );
}

export default LatestProjects;