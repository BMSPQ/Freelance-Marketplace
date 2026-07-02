import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUser,
  FaTools,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let data = [...projects];

    const selectedCategory = searchParams.get("category");

    if (selectedCategory) {
      data = data.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (search) {
      data = data.filter((project) =>
        project.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      data = data.filter(
        (project) => project.category === category
      );
    }

    switch (sortBy) {
      case "low":
        data.sort((a, b) => a.budget - b.budget);
        break;

      case "high":
        data.sort((a, b) => b.budget - a.budget);
        break;

      case "old":
        data.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "deadline":
        data.sort(
          (a, b) =>
            new Date(a.deadline) -
            new Date(b.deadline)
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    setFilteredProjects(data);

  }, [projects, search, category, sortBy, searchParams]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const [projectRes, profileRes] = await Promise.all([
        API.get("/projects"),
        API.get("/auth/profile").catch(() => null),
      ]);

      setProjects(projectRes.data.projects);

      if (profileRes) {
        setUser(profileRes.data.user);
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
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
        <h3>Loading Projects...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Browse Projects</h2>

        <button
          className="btn btn-primary"
          onClick={fetchData}
        >
          Refresh
        </button>

      </div>

      <p className="text-muted">
        {filteredProjects.length} Project(s) Found
      </p>

      {/* Search, Filter & Sort */}

      <div className="row mb-4">

        <div className="col-lg-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-lg-4 mb-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Web Development</option>
            <option>App Development</option>
            <option>Graphic Design</option>
            <option>UI / UX Design</option>
            <option>Content Writing</option>
            <option>Digital Marketing</option>
            <option>Data Analysis</option>
            <option>AI & Machine Learning</option>
            <option>Database Management</option>
            <option>Cloud Computing</option>
          </select>
        </div>

        <div className="col-lg-4 mb-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="old">Oldest</option>
            <option value="low">Budget: Low → High</option>
            <option value="high">Budget: High → Low</option>
            <option value="deadline">Nearest Deadline</option>
          </select>
        </div>

      </div>

      <div className="row">

        {filteredProjects.length === 0 ? (

          <div className="text-center py-5">
            <h3>No Projects Found</h3>
          </div>

        ) : (

          filteredProjects.map((project) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={project._id}
            >

              <div
                className="card shadow border-0 h-100"
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

                <div className="card-body">

                  <span className="badge bg-primary mb-3">
                    {project.category}
                  </span>

                  <h4>{project.title}</h4>

                  <p className="text-muted">
                    {project.description.length > 120
                      ? project.description.substring(0, 120) + "..."
                      : project.description}
                  </p>

                  <p>
                    <FaMoneyBillWave className="text-success me-2" />
                    ₹{project.budget}
                  </p>

                  <p>
                    <FaCalendarAlt className="text-danger me-2" />
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>

                  <p>
                    <FaUser className="text-primary me-2" />
                    {project.client?.name || "Unknown"}
                  </p>

                  <div className="mb-3">
                    <FaTools className="text-warning me-2" />

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
                      <span>No Skills</span>
                    )}
                  </div>

                  <p>
                    <span
                      className={`badge bg-${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </p>

                  <div className="d-grid gap-2">

                    <Link
                      to={`/projects/${project._id}`}
                      className="btn btn-dark"
                    >
                      View Details
                    </Link>

                    {user?.role === "freelancer" &&
                      project.status === "Open" && (
                        <Link
                          to={`/place-bid/${project._id}`}
                          className="btn btn-success"
                        >
                          Apply Bid
                        </Link>
                      )}

                    {user?.role === "client" && (
                      <Link
                        to={`/view-bids/${project._id}`}
                        className="btn btn-primary"
                      >
                        View Bids
                      </Link>
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

export default Projects;