import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaClock,
  FaUserCircle,
} from "react-icons/fa";

function FeaturedFreelancers({ freelancers = [] }) {
  return (
    <section className="py-5 bg-white">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Featured Freelancers
          </h2>

          <p className="text-muted">
            Meet talented freelancers ready to work on your next project.
          </p>
        </div>

        <div className="row">

          {freelancers.length === 0 ? (

            <div className="text-center">
              <h4>No Freelancers Found</h4>
            </div>

          ) : (

            freelancers.map((person) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={person._id}
              >

                <div
                  className="card border-0 shadow h-100 text-center p-4"
                  style={{
                    borderRadius: "20px",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >

                  {person.profileImage ? (
                    <img
                      src={person.profileImage}
                      alt={person.name}
                      className="rounded-circle mx-auto mb-3 border border-3 border-primary"
                      width="120"
                      height="120"
                    />
                  ) : (
                    <FaUserCircle
                      size={120}
                      className="text-secondary mx-auto mb-3"
                    />
                  )}

                  <h4 className="fw-bold">
                    {person.name}
                  </h4>

                  <p className="text-primary">
                    {person.skills?.length
                      ? person.skills.join(", ")
                      : "No Skills Added"}
                  </p>

                  <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <FaClock className="text-warning" />
                    <span>
                      {person.experience} Years Experience
                    </span>
                  </div>

                  <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                    <FaBriefcase className="text-success" />
                    <span>Available for Work</span>
                  </div>

                  <Link
                    to={`/freelancer/${person._id}`}
                    className="btn btn-primary w-100"
                  >
                    View Profile
                  </Link>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </section>
  );
}

export default FeaturedFreelancers;