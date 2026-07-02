import {
  FaProjectDiagram,
  FaUsers,
  FaUserTie,
  FaHandshake,
} from "react-icons/fa";

function Statistics({
  statistics = {
    totalProjects: 0,
    totalFreelancers: 0,
    totalClients: 0,
    totalBids: 0,
  },
}) {
  const data = [
    {
      id: 1,
      title: "Projects",
      value: statistics.totalProjects,
      icon: <FaProjectDiagram size={45} />,
      color: "primary",
    },
    {
      id: 2,
      title: "Freelancers",
      value: statistics.totalFreelancers,
      icon: <FaUsers size={45} />,
      color: "success",
    },
    {
      id: 3,
      title: "Clients",
      value: statistics.totalClients,
      icon: <FaUserTie size={45} />,
      color: "warning",
    },
    {
      id: 4,
      title: "Total Bids",
      value: statistics.totalBids,
      icon: <FaHandshake size={45} />,
      color: "danger",
    },
  ];

  return (
    <section
      className="py-5 text-white"
      style={{
        background: "linear-gradient(135deg,#0d6efd,#6610f2)",
      }}
    >
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Marketplace Statistics
          </h2>

          <p className="text-light">
            Live statistics from our freelance marketplace.
          </p>
        </div>

        <div className="row">

          {data.map((item) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={item.id}
            >

              <div
                className="card border-0 shadow text-center h-100"
                style={{
                  borderRadius: "20px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >

                <div className="card-body">

                  <div className={`text-${item.color} mb-3`}>
                    {item.icon}
                  </div>

                  <h1 className="fw-bold">
                    {item.value}
                  </h1>

                  <h5 className="text-muted">
                    {item.title}
                  </h5>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Statistics;