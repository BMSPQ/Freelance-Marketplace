import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    skills: "",
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
  setLoading(true);

  try {
    const res = await API.get(`/projects/${id}`);

    const project = res.data.project;

    setFormData({
      title: project.title || "",
      description: project.description || "",
      category: project.category || "",
      budget: project.budget || "",
      deadline: project.deadline
        ? project.deadline.substring(0, 10)
        : "",
      skills: Array.isArray(project.skills)
        ? project.skills.join(", ")
        : "",
    });

    } catch (error) {
      toast.error("Failed to load project");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setUpdating(true);

  try {
    await API.put(`/projects/${id}`, {
      ...formData,
      budget: Number(formData.budget),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });

    toast.success("Project Updated Successfully");
    navigate("/my-projects");

  } catch (error) {
    toast.error(error.response?.data?.message || "Update Failed");
  } finally {
    setUpdating(false);
  }
};

if (loading) {
  return (
    <div className="container mt-5 text-center">
      <h3>Loading Project...</h3>
    </div>
  );
}

  return (
    <div className="container py-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Edit Project
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            className="form-control mb-3"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
          />

          <input
            type="number"
            className="form-control mb-3"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
          />

          <input
            type="date"
            className="form-control mb-3"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js"
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Project"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProject;