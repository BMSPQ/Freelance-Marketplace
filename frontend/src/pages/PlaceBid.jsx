import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function PlaceBid() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    deliveryTime: "",
    proposal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.amount) <= 0) {
      return toast.error("Bid amount must be greater than 0");
    }

    if (Number(formData.deliveryTime) <= 0) {
      return toast.error("Delivery time must be greater than 0");
    }

    if (formData.proposal.trim().length < 20) {
      return toast.error(
        "Proposal should contain at least 20 characters"
      );
    }

    setSubmitting(true);

    try {
      const res = await API.post(`/bids/${projectId}`, {
        amount: Number(formData.amount),
        deliveryTime: Number(formData.deliveryTime),
        proposal: formData.proposal.trim(),
      });

      toast.success(res.data.message);

      setFormData({
        amount: "",
        deliveryTime: "",
        proposal: "",
      });

      navigate("/my-bids");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to submit bid"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Place Your Bid
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Bid Amount (₹)
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter your bid amount"
                    min="1"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Delivery Time (Days)
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    placeholder="Expected delivery days"
                    min="1"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Proposal
                  </label>

                  <textarea
                    className="form-control"
                    rows="6"
                    name="proposal"
                    value={formData.proposal}
                    onChange={handleChange}
                    placeholder="Explain why you are the best person for this project..."
                    required
                  />
                </div>

                <button
                  className="btn btn-success w-100"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Bid"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PlaceBid;