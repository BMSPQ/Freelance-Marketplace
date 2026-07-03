import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "freelancer",
    skills: "",
    experience: 0,
    hourlyRate: "",
    location: "",
    bio: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        experience: Number(formData.experience),

        skills:
          formData.role === "freelancer"
            ? formData.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : [],

        // These will be ignored until backend supports them
        hourlyRate: Number(formData.hourlyRate) || 0,
        location: formData.location,
        bio: formData.bio,
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
      };

      const res = await API.post("/auth/register", data);

      toast.success(res.data.message);

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow p-4 rounded-4">

            <h2 className="text-center mb-4">
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="form-check-input"
                  checked={showPassword}
                  onChange={() =>
                    setShowPassword(!showPassword)
                  }
                />

                <label
                  htmlFor="showPassword"
                  className="form-check-label"
                >
                  Show Password
                </label>
              </div>

              <div className="mb-3">
                <label>Role</label>

                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="freelancer">
                    Freelancer
                  </option>

                  <option value="client">
                    Client
                  </option>
                </select>
              </div>

              {formData.role === "freelancer" && (
                <>
                  <div className="mb-3">
                    <label>Skills</label>

                    <input
                      type="text"
                      name="skills"
                      className="form-control"
                      placeholder="React, Node.js, MongoDB"
                      value={formData.skills}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Experience (Years)</label>

                    <input
                      type="number"
                      name="experience"
                      className="form-control"
                      min="0"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Hourly Rate (₹)</label>

                    <input
                      type="number"
                      name="hourlyRate"
                      className="form-control"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Location</label>

                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      placeholder="Bhubaneswar, Odisha"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Bio</label>

                    <textarea
                      rows="4"
                      name="bio"
                      className="form-control"
                      placeholder="Tell clients about yourself..."
                      value={formData.bio}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label>GitHub</label>

                    <input
                      type="url"
                      name="github"
                      className="form-control"
                      placeholder="https://github.com/username"
                      value={formData.github}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>LinkedIn</label>

                    <input
                      type="url"
                      name="linkedin"
                      className="form-control"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label>Portfolio</label>

                    <input
                      type="url"
                      name="portfolio"
                      className="form-control"
                      placeholder="https://yourportfolio.com"
                      value={formData.portfolio}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Register"}
              </button>

            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
