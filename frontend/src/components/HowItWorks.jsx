import {
  FaClipboardList,
  FaGavel,
  FaUserCheck,
  FaCheckCircle,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <FaClipboardList size={45} />,
      title: "Post Your Project",
      description:
        "Clients post projects with budget, deadline, and required skills.",
      color: "primary",
    },
    {
      id: 2,
      icon: <FaGavel size={45} />,
      title: "Receive Bids",
      description:
        "Freelancers submit competitive bids and detailed proposals.",
      color: "success",
    },
    {
      id: 3,
      icon: <FaUserCheck size={45} />,
      title: "Hire Freelancer",
      description:
        "Compare proposals and hire the freelancer that best fits your project.",
      color: "warning",
    },
    {
      id: 4,
      icon: <FaCheckCircle size={45} />,
      title: "Complete Project",
      description:
        "Collaborate, complete the work, and close the project successfully.",
      color: "danger",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            How It Works
          </h2>

          <p className="text-muted">
            Get your project completed in four simple steps.
          </p>
        </div>

        <div className="row">

          {steps.map((step) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={step.id}
            >

              <div
                className="card border-0 shadow text-center h-100 p-4"
                style={{
                  borderRadius: "20px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >

                <div className={`text-${step.color} mb-3`}>
                  {step.icon}
                </div>

                <h4 className="fw-bold">
                  {step.id}. {step.title}
                </h4>

                <p className="text-muted">
                  {step.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;