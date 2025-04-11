"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [sliderItems, setSliderItems] = useState([]);
  const apiEndpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/user/parking/stations/`);
        setSliderItems(response.data.data || []);
        console.log("Slider items:", response.data.data);
      } catch (error) {
        console.error("Error fetching slider items:", error);
        setSliderItems([]); // Ensure sliderItems is an array even if the fetch fails
      }
    };
  
    fetchData();
  }, [apiEndpoint]);
  


  return (
    <>
    
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {sliderItems.map((listing) => (
          <SwiperSlide key={listing.ownerID}>
            <div className="item">
              <div className="listing-style7 mb60">
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    className="w-100 h-100 cover"
                    src={`${apiEndpoint}${listing.images[0]?.image || "/default-image.jpg"}`}
                    alt={listing.owner_name}
                  />
                  <div className="sale-sticker-wrap">
                    <div className="list-tag2 rounded-0 fz12">AVAILABLE</div>
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link href={`/single-v5/${listing.ownerID}/`}>
                      {listing.owner_name}
                    </Link>
                  </h6>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="list-price">
                      Starting at ₹
                      {Math.min(
                        ...listing.pricing.map((price) => price.hourly_rate)
                      )}{" "}
                      / hour
                    </div>
                    <div className="list-meta2 d-flex align-items-center">
                      <span className="mr10">
                        <i className="flaticon-location-pin mr5" />
                        {listing.owner_address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <button className="featured-prev__active swiper_button">
            <i className="far fa-arrow-left-long" />
          </button>
        </div>

        <div className="col-auto">
          <div className="pagination swiper--pagination featured-pagination__active" />
        </div>

        <div className="col-auto">
          <button className="featured-next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FeaturedListings;
