"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import SingleReview from "./SingleReview";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Best Seller", value: "best_seller" },
  { label: "Best Match", value: "best_match" },
  { label: "Price Low", value: "price_low" },
  { label: "Price High", value: "price_high" },
];

const AllReviews = () => {
  const { ownerID } = useParams();
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  const apiEndpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

  useEffect(() => {
    const fetchReviews = async () => {
      if (!apiEndpoint) {
        console.error("API endpoint is missing");
        return;
      }

      try {
        const response = await axios.get(`${apiEndpoint}/user/parking/stations/`);
        const parkingData = response?.data?.data || [];

        const ownerData = parkingData.find((item) => item.ownerID === ownerID);

        setReviews(ownerData?.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (ownerID) fetchReviews();
  }, [ownerID, apiEndpoint]); 

  // Sorting Logic
  const sortedReviews = useMemo(() => {
    if (sortBy === "newest") {
      return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    // Add more sorting conditions if needed
    return reviews;
  }, [reviews, sortBy]);

  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <div className="total_review d-flex align-items-center justify-content-between mb20">
              <h6 className="fz17 mb15">
                <i className="fas fa-star fz12 pe-2" />
                5.0 · {reviews.length} reviews
              </h6>
              <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                <div className="pcs_dropdown mb15 d-flex align-items-center">
                  <span style={{ minWidth: "60px" }}>Sort by</span>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* End review filter */}

          {sortedReviews.length > 0 ? (
            sortedReviews.map((review, index) => <SingleReview key={index} review={review} />)
          ) : (
            <p>No reviews found.</p>
          )}
          {/* End reviews */}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
