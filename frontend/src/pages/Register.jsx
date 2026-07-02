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
      };

      const res = await API.post("/auth/register", data);

      toast.success(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "freelancer",
        skills: "",
        experience: 0,
      });

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

        <div className="col-lg-6">

          <div className="card shadow p-4">

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

              <div className="form-check mb-3">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() =>
                    setShowPassword(!showPassword)
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor="showPassword"
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
                </>
              )}

              <button
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
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