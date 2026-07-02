import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);

    try {
      const res = await API.get("/projects/my-projects");
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setProcessing(true);

    try {
      const res = await API.delete(`/projects/${id}`);
      toast.success(res.data.message);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleComplete = async (id) => {
    setProcessing(true);

    try {
      const res = await API.put(`/projects/${id}/complete`);
      toast.success(res.data.message);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation Failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = async (id) => {
    setProcessing(true);

    try {
      const res = await API.put(`/projects/${id}/close`);
      toast.success(res.data.message);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation Failed");
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
        return "bg-primary";

      case "In Progress":
        return "bg-warning text-dark";

      case "Completed":
        return "bg-success";

      case "Closed":
        return "bg-secondary";

      default:
        return "bg-dark";
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Projects...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>My Projects</h2>

        <button
          className="btn btn-primary"
          onClick={fetchProjects}
        >
          Refresh
        </button>

      </div>

      <div className="row">

        {projects.length === 0 ? (

          <div className="text-center">
            <h4>No Projects Found</h4>
          </div>

        ) : (

          projects.map((project) => (

            <div
              className="col-lg-6 mb-4"
              key={project._id}
            >

              <div className="card shadow h-100">

                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">

                    <h4 className="fw-bold">
                      {project.title}
                    </h4>

                    <span
                      className={`badge ${getStatusBadge(project.status)}`}
                    >
                      {project.status}
                    </span>

                  </div>

                  <hr />

                  <p className="text-muted">
                    {project.description}
                  </p>

                  <p>
                    <strong>Category:</strong> {project.category}
                  </p>

                  <p>
                    <strong>Budget:</strong> ₹{project.budget}
                  </p>

                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Skills:</strong>{" "}
                    {project.skills?.length > 0
                      ? project.skills.join(", ")
                      : "Not specified"}
                  </p>

                  <div className="d-flex flex-wrap gap-2 mt-4">

                    {project.status === "Open" && (
                      <Link
                        to={`/edit-project/${project._id}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                    )}

                    <Link
                      to={`/view-bids/${project._id}`}
                      className="btn btn-info text-white"
                    >
                      View Bids
                    </Link>

                    {project.status === "In Progress" && (
                      <button
                        className="btn btn-success"
                        disabled={processing}
                        onClick={() =>
                          handleComplete(project._id)
                        }
                      >
                        Complete Project
                      </button>
                    )}

                    {project.status === "Completed" && (
                      <button
                        className="btn btn-dark"
                        disabled={processing}
                        onClick={() =>
                          handleClose(project._id)
                        }
                      >
                        Close Project
                      </button>
                    )}

                    {project.status === "Open" && (
                      <button
                        className="btn btn-danger"
                        disabled={processing}
                        onClick={() =>
                          handleDelete(project._id)
                        }
                      >
                        Delete
                      </button>
                    )}

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default MyProjects;