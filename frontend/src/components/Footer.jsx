import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">

      <div className="container py-4">

        <div className="row">

          <div className="col-md-6">

            <h4 className="fw-bold">
              Freelance Marketplace
            </h4>

            <p className="text-light">
              A platform that connects talented freelancers with
              clients worldwide.
            </p>

          </div>

          <div className="col-md-3">

            <h5>Quick Links</h5>

            <ul className="list-unstyled">

              <li>Home</li>

              <li>Projects</li>

              <li>Dashboard</li>

              <li>Profile</li>

            </ul>

          </div>

          <div className="col-md-3">

            <h5>Contact</h5>

            <p>
              <FaEnvelope className="me-2" />
              support@freelance.com
            </p>

            <div className="d-flex gap-3 justify-content-center justify-content-md-start">

              <FaGithub
                size={24}
                style={{ cursor: "pointer" }}
              />

              <FaLinkedin
                size={24}
                style={{ cursor: "pointer" }}
              />

            </div>

          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center">

          <p className="mb-0">
            © 2026 Freelance Marketplace. All Rights Reserved.
          </p>

          <small
            style={{
              fontSize: "10px",
              color: "#6c757d",
              letterSpacing: "1px",
            }}
          >
            v1.0 • BMSPQ
          </small>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
