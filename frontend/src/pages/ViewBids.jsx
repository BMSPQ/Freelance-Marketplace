import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function ViewBids() {
  const { projectId } = useParams();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchBids();
  }, [projectId]);

  const fetchBids = async () => {
    setLoading(true);

    try {
      const res = await API.get(`/bids/project/${projectId}`);
      setBids(res.data.bids);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load bids");
    } finally {
      setLoading(false);
    }
  };

  const acceptBid = async (bidId) => {
    if (!window.confirm("Accept this bid?")) return;

    setProcessingId(bidId);

    try {
      const res = await API.put(`/bids/accept/${bidId}`);

      toast.success(res.data.message);

      fetchBids();

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept bid");
    } finally {
      setProcessingId(null);
    }
  };

  const rejectBid = async (bidId) => {
    if (!window.confirm("Reject this bid?")) return;

    setProcessingId(bidId);

    try {
      const res = await API.put(`/bids/reject/${bidId}`);

      toast.success(res.data.message);

      fetchBids();

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject bid");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-success";
      case "Rejected":
        return "bg-danger";
      default:
        return "bg-warning text-dark";
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Bids...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Project Bids</h2>

        <button
          className="btn btn-outline-primary"
          onClick={fetchBids}
        >
          Refresh
        </button>

      </div>

      {bids.length === 0 ? (
        <div className="alert alert-info text-center">
          No bids have been submitted yet.
        </div>
      ) : (
        <div className="row">

          {bids.map((bid) => (

            <div className="col-lg-6 mb-4" key={bid._id}>

              <div className="card shadow h-100">

                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">

                    <h4>{bid.freelancer.name}</h4>

                    <span className={`badge ${getStatusClass(bid.status)}`}>
                      {bid.status}
                    </span>

                  </div>

                  <hr />

                  <p>
                    <strong>Email:</strong> {bid.freelancer.email}
                  </p>

                  <p>
                    <strong>Skills:</strong>{" "}
                    {bid.freelancer.skills.length
                      ? bid.freelancer.skills.join(", ")
                      : "No Skills"}
                  </p>

                  <p>
                    <strong>Experience:</strong>{" "}
                    {bid.freelancer.experience} Years
                  </p>

                  <hr />

                  <p>
                    <strong>Bid Amount:</strong> ₹{bid.amount}
                  </p>

                  <p>
                    <strong>Delivery Time:</strong>{" "}
                    {bid.deliveryTime} Days
                  </p>

                  <p>
                    <strong>Proposal:</strong>
                  </p>

                  <p className="text-muted">
                    {bid.proposal}
                  </p>

                  {bid.status === "Pending" && (
                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-success w-50"
                        disabled={processingId === bid._id}
                        onClick={() => acceptBid(bid._id)}
                      >
                        {processingId === bid._id
                          ? "Processing..."
                          : "Accept"}
                      </button>

                      <button
                        className="btn btn-danger w-50"
                        disabled={processingId === bid._id}
                        onClick={() => rejectBid(bid._id)}
                      >
                        {processingId === bid._id
                          ? "Processing..."
                          : "Reject"}
                      </button>

                    </div>
                  )}

                  {bid.status === "Accepted" && (
                    <button
                      className="btn btn-success w-100"
                      disabled
                    >
                      Accepted
                    </button>
                  )}

                  {bid.status === "Rejected" && (
                    <button
                      className="btn btn-danger w-100"
                      disabled
                    >
                      Rejected
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default ViewBids;