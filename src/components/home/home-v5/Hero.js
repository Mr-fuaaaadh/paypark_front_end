"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// Disable SSR for react-select to avoid hydration mismatch
const Select = dynamic(() => import("react-select"), { ssr: false });

const Hero = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [sliderItems, setSliderItems] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const apiEndpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

  useEffect(() => {
    setIsClient(true); // Ensures the component only renders on the client

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/user/parking/stations/`);
        setSliderItems(response.data.data);
      } catch (error) {
        console.error("Error fetching slider items:", error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  // Avoid SSR mismatch by rendering only on the client
  if (!isClient) return null;

  return (
    <>
      <div className="hero-large-home5">
        {sliderItems.length > 0 && (
          <Swiper
            direction="vertical"
            spaceBetween={0}
            slidesPerView={1}
            speed={1400}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Thumbs]}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            style={{ height: "850px" }}
          >
            {sliderItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="item">
                  <div
                    className="slider-slide-item"
                    style={{
                      backgroundImage: item.images && item.images.length > 0
                        ? `url(http://13.60.216.198${item.images[0].image})`
                        : "url(/images/default-placeholder.jpg)",
                    }}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 text-left position-relative">
                          <h4 className="h1 slider-subtitle text-white">
                            {item.price}
                          </h4>
                          <h3 className="h6 slider-title text-white">
                            {item.owner_name}
                          </h3>
                          <p className="mb30 slider-text text-white">
                            {item.description}
                          </p>
                          <div className="slider-btn-block">
                            <Link
                              href={`/single-v5/${item.ownerID}/`}
                              className="ud-btn btn-white slider-btn"
                            >
                              View Details
                              <i className="fal fa-arrow-right-long" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {sliderItems.length > 0 && (
        <div className="custom_thumbs">
          <Swiper
            direction="vertical"
            modules={[Thumbs]}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            slidesPerView={sliderItems.length}
            spaceBetween={0}
            style={{ height: "268px" }}
          >
            {sliderItems.map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  width={50}
                  height={50}
                  className="cover"
                  src={
                    item.images && item.images.length > 0
                      ? `http://13.60.216.198${item.images[0].image}`
                      : "/images/default-placeholder.jpg"
                  }
                  alt="thumb"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Hero;
