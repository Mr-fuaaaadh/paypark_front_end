"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Rating from "react-rating";

const ReviewBoxForm = () => {
  // Local component state
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);     // Track the API request status
  const [error, setError] = useState(null);          // Track error messages
  const [success, setSuccess] = useState(false);     // Track success

  const { ownerID } = useParams();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


  const apiEndpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

  // Clear success/error messages on rating / review text change
  // or whenever the form is re-interacted with
  useEffect(() => {
    if (success) setSuccess(false);
    if (error) setError(null);
  }, [rating, reviewText, success, error]); 


  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ownerID) {
      setError("No owner ID was provided in the URL.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const reviewData = {
        owner: ownerID,
        rating: rating,
        review_text: reviewText,
      };

      const response = await axios.post(
        `${apiEndpoint}/api/parkig/station/review/`,
        reviewData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setRating(0);
        setReviewText("");
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred while submitting the review:", err);
      setError("An error occurred. Please try again later.");
      console.log("Error Object:", error);
      // console.log("Error Response:", error.response);
      // console.log("Error Message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="comments_form mt30" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          {/* Rating Field */}
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Rating</label>
            <div>
              <Rating
                initialRating={rating}
                onChange={(value) => setRating(value)}
                emptySymbol="far fa-star text-gray-300 text-2xl"
                fullSymbol="fas fa-star text-yellow-400 text-2xl"
              />
            </div>
          </div>

          {/* Review Text Field */}
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Review</label>
            <textarea
              className="pt15"
              rows={6}
              placeholder="Write a Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>

          {/* Error or success feedback */}
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ color: "green", marginBottom: "1rem" }}>
              Review submitted successfully!
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="ud-btn btn-white2"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
            {!loading && <i className="fal fa-arrow-right-long" />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewBoxForm;
