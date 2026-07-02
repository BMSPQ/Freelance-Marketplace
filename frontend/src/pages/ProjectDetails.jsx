import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [totalBids, setTotalBids] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);

    try {
      const res = await API.get(`/projects/${id}`);

      setProject(res.data.project);
      setTotalBids(res.data.totalBids);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "success";
      case "In Progress":
        return "warning text-dark";
      case "Completed":
        return "primary";
      case "Closed":
        return "secondary";
      default:
        return "dark";
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Project...</h3>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-5 text-center">
        <h3>Project Not Found</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card shadow-lg border-0">

        <div className="card-body p-5">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2 className="fw-bold">
                {project.title}
              </h2>

              <span className="badge bg-primary fs-6">
                {project.category}
              </span>

            </div>

            <span
              className={`badge bg-${getStatusColor(project.status)} fs-6`}
            >
              {project.status}
            </span>

          </div>

          <hr />

          <h4>Description</h4>

          <p className="text-muted">
            {project.description}
          </p>

          <div className="row mt-4">

            <div className="col-md-6">

              <h5>Budget</h5>

              <p className="fw-bold text-success">
                ₹{project.budget}
              </p>

            </div>

            <div className="col-md-6">

              <h5>Deadline</h5>

              <p>
                {new Date(project.deadline).toLocaleDateString()}
              </p>

            </div>

            <div className="col-md-6">

              <h5>Posted On</h5>

              <p>
                {new Date(project.createdAt).toLocaleDateString()}
              </p>

            </div>

            <div className="col-md-6">

              <h5>Total Bids</h5>

              <p className="fw-bold text-primary">
                {totalBids}
              </p>

            </div>

          </div>

          <hr />

          <h4>Required Skills</h4>

          <div className="mb-4">

            {project.skills?.length > 0 ? (

              project.skills.map((skill, index) => (

                <span
                  key={index}
                  className="badge bg-secondary me-2 mb-2"
                >
                  {skill}
                </span>

              ))

            ) : (

              <p>No skills specified.</p>

            )}

          </div>

          <hr />

          <h4 className="mb-3">
            Client Information
          </h4>

          <div className="card bg-light border-0 p-3">

            <h5 className="fw-bold">
              {project.client?.name}
            </h5>

            <p className="text-muted">
              {project.client?.email}
            </p>

            {project.client?._id && (
              <Link
                to={`/freelancer/${project.client._id}`}
                className="btn btn-outline-primary"
              >
                View Client Profile
              </Link>
            )}

          </div>

          <div className="mt-4 d-flex gap-3 flex-wrap">

            {project.status === "Open" && (
              <Link
                to={`/place-bid/${project._id}`}
                className="btn btn-success"
              >
                Place Bid
              </Link>
            )}

            <button
              className="btn btn-secondary"
              onClick={fetchProject}
            >
              Refresh
            </button>

            <Link
              to="/projects"
              className="btn btn-outline-primary"
            >
              Back to Projects
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectDetails;