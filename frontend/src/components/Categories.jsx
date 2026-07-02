import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaPenNib,
  FaBullhorn,
  FaChartLine,
  FaRobot,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";

function Categories({ categories = [] }) {
  const navigate = useNavigate();

  const allCategories = [
    {
      name: "Web Development",
      icon: <FaCode size={45} />,
      color: "primary",
    },
    {
      name: "App Development",
      icon: <FaMobileAlt size={45} />,
      color: "success",
    },
    {
      name: "UI / UX Design",
      icon: <FaPaintBrush size={45} />,
      color: "warning",
    },
    {
      name: "Graphic Design",
      icon: <FaPaintBrush size={45} />,
      color: "danger",
    },
    {
      name: "Content Writing",
      icon: <FaPenNib size={45} />,
      color: "secondary",
    },
    {
      name: "Digital Marketing",
      icon: <FaBullhorn size={45} />,
      color: "info",
    },
    {
      name: "Data Analysis",
      icon: <FaChartLine size={45} />,
      color: "dark",
    },
    {
      name: "AI & Machine Learning",
      icon: <FaRobot size={45} />,
      color: "primary",
    },
    {
      name: "Database Management",
      icon: <FaDatabase size={45} />,
      color: "success",
    },
    {
      name: "Cloud Computing",
      icon: <FaCloud size={45} />,
      color: "info",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Explore Popular Categories</h2>

          <p className="text-muted">
            Find projects in your favorite technology.
          </p>
        </div>

        <div className="row">

          {allCategories.map((item) => {

            const found = categories.find(
              (c) => c.name === item.name
            );

            const count = found ? found.count : 0;

            return (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={item.name}
              >
                <div
                  className="card border-0 shadow h-100 text-center p-4"
                  style={{
                    borderRadius: "20px",
                    transition: "0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div className={`text-${item.color} mb-3`}>
                    {item.icon}
                  </div>

                  <h5 className="fw-bold">
                    {item.name}
                  </h5>

                  {count > 0 ? (
                    <>
                      <span className="badge bg-success mt-2 mb-3">
                        {count} Project{count > 1 ? "s" : ""} Available
                      </span>

                      <button
                        className="btn btn-primary w-100"
                        onClick={() =>
                          navigate(
                            `/projects?category=${encodeURIComponent(item.name)}`
                          )
                        }
                      >
                        Browse Projects
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="badge bg-secondary mt-2 mb-3">
                        Coming Soon
                      </span>

                      <button
                        className="btn btn-outline-secondary w-100"
                        disabled
                      >
                        No Projects Yet
                      </button>
                    </>
                  )}

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Categories;