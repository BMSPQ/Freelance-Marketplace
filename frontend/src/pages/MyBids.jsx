import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function MyBids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    setLoading(true);

    try {
      const res = await API.get("/bids/my-bids");
      setBids(res.data.bids);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load your bids");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "success";
      case "Rejected":
        return "danger";
      case "Pending":
        return "warning";
      case "Completed":
        return "primary";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading My Bids...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>My Bids</h2>

        <button
          className="btn btn-primary"
          onClick={fetchBids}
        >
          Refresh
        </button>

      </div>

      <div className="row">

        {bids.length === 0 ? (

          <div className="text-center">
            <h4>No Bids Found</h4>
          </div>

        ) : (

          bids.map((bid) => (

            <div
              className="col-lg-6 mb-4"
              key={bid._id}
            >

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4 className="fw-bold">
                    {bid.project?.title || "Project Deleted"}
                  </h4>

                  <p>
                    <strong>Category:</strong>{" "}
                    {bid.project?.category || "N/A"}
                  </p>

                  <p>
                    <strong>Project Budget:</strong>{" "}
                    ₹{bid.project?.budget || 0}
                  </p>

                  <p>
                    <strong>Your Bid:</strong> ₹{bid.amount}
                  </p>

                  <p>
                    <strong>Delivery Time:</strong>{" "}
                    {bid.deliveryTime} Days
                  </p>

                  <p>
                    <strong>Bid Status:</strong>{" "}
                    <span
                      className={`badge bg-${getStatusColor(
                        bid.status
                      )}`}
                    >
                      {bid.status}
                    </span>
                  </p>

                  <p>
                    <strong>Project Status:</strong>{" "}
                    <span
                      className={`badge bg-${getStatusColor(
                        bid.project?.status
                      )}`}
                    >
                      {bid.project?.status || "N/A"}
                    </span>
                  </p>

                  <hr />

                  <h6>Proposal</h6>

                  <p className="text-muted">
                    {bid.proposal}
                  </p>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default MyBids;