import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          Freelance Marketplace
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/projects">
                    Browse Projects
                  </NavLink>
                </li>

                {user?.role === "client" && (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/create-project"
                      >
                        Create Project
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/my-projects"
                      >
                        My Projects
                      </NavLink>
                    </li>
                  </>
                )}

                {user?.role === "freelancer" && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/my-bids"
                    >
                      My Bids
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item mx-lg-3">
                  <span className="badge bg-primary">
                    {user?.name}
                  </span>
                </li>

                <li className="nav-item">
                  <span className="badge bg-success me-2">
                    {user?.role}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger ms-lg-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;