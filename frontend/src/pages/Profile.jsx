import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
    hourlyRate: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const res = await API.get("/auth/profile");

      const user = res.data.user;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        skills: user.skills?.join(", ") || "",
        experience: user.experience || "",
        bio: user.bio || "",
        location: user.location || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
        hourlyRate: user.hourlyRate || "",
      });

    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
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
      const res = await API.put("/auth/profile", {
        name: formData.name,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        experience: Number(formData.experience),
        bio: formData.bio,
        location: formData.location,
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        hourlyRate: Number(formData.hourlyRate),
      });

      toast.success(res.data.message);
      fetchProfile();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Profile Update Failed"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              My Profile
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label>Skills</label>
                <input
                  type="text"
                  className="form-control"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="mb-3">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Hourly Rate (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Bhubaneswar, Odisha"
                />
              </div>

              <div className="mb-3">
                <label>Bio</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell clients about yourself..."
                />
              </div>

              <div className="mb-3">
                <label>GitHub</label>
                <input
                  type="url"
                  className="form-control"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="mb-3">
                <label>LinkedIn</label>
                <input
                  type="url"
                  className="form-control"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="mb-4">
                <label>Portfolio</label>
                <input
                  type="url"
                  className="form-control"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;