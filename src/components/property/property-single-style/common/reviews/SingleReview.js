"use client";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import React from "react";

const apiEndpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;


const SingleReview = ({ review }) => {
  const userImage = review.user_image
    ? `${apiEndpoint}${review.user_image}`
    : "/images/blog/comments-2.png";

  const rating = review.rating ? parseFloat(review.rating) : 0; // Ensure rating is a number
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half-star

  return (
    <div className="col-md-12">
      <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
        <Image width={60} height={60} src={userImage} className="mr-3" alt="User Avatar" />

        <div className="ml20">
          <h6 className="mt-0 mb-0">{review.user_name || "Anonymous"}</h6>
          <div>
            <span className="fz14">{review.date || "No date provided"},{review.time}</span>
            <div className="blog-single-review">
              <ul className="mb0 ps-0 d-flex">
                {/* Full Stars */}
                {[...Array(fullStars)].map((_, i) => (
                  <li className="list-inline-item me-0" key={i}>
                    <i className="fas fa-star review-color2 fz10" />
                  </li>
                ))}

                {/* Half Star (if applicable) */}
                {hasHalfStar && (
                  <li className="list-inline-item me-0">
                    <i className="fas fa-star-half-alt review-color2 fz10" />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="text mt20 mb20">{review.review_text || "No review text available."}</p>

      <div className="review_cansel_btns d-flex bdrb1 pb30">
        <button className="btn btn-link">
          <i className="fas fa-thumbs-up" /> Helpful
        </button>
        <button className="btn btn-link">
          <i className="fas fa-thumbs-down" /> Not helpful
        </button>
      </div>
    </div>
  );
};

export default SingleReview;
