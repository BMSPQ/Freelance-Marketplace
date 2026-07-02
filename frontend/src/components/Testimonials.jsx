import {
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Startup Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "The platform made it easy to find a skilled freelancer. The project was completed before the deadline with excellent quality.",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Business Owner",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "Simple bidding process and great communication. I hired a freelancer within a few hours and the experience was excellent.",
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Freelancer",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      review:
        "A fantastic marketplace to discover quality projects. Payments and collaboration were smooth throughout the project.",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            What Our Users Say
          </h2>

          <p className="text-muted">
            Trusted by clients and freelancers across different industries.
          </p>
        </div>

        <div className="row">

          {reviews.map((review) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={review.id}
            >

              <div
                className="card border-0 shadow h-100 p-4"
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

                <FaQuoteLeft
                  size={35}
                  className="text-primary mb-3"
                />

                <p className="text-muted">
                  {review.review}
                </p>

                <div className="mb-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className="text-warning me-1"
                    />
                  ))}
                </div>

                <div className="d-flex align-items-center">

                  <img
                    src={review.image}
                    alt={review.name}
                    width="65"
                    height="65"
                    loading="lazy"
                    className="rounded-circle me-3"
                  />

                  <div>
                    <h5 className="mb-0">
                      {review.name}
                    </h5>

                    <small className="text-muted">
                      {review.role}
                    </small>
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;