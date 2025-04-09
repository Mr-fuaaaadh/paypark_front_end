"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";

const NearbySimilarProperty = () => {
  const [sliderItems, setSliderItems] = useState([]);
  const apiEndpoint = "http://13.60.216.198"; // Replace with your API base URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/user/parking/stations/`);
        setSliderItems(response.data.data);
        console.log("Fetched parking stations:", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          300: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {sliderItems.map((item) => (
          <SwiperSlide key={item.ownerID}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    className="w-100 h-100 cover"
                    src={item.images?.[0]?.image ? `${apiEndpoint}${item.images[0].image}` : "/placeholder.jpg"}
                    alt={item.owner_name}
                  />
                  <div className="sale-sticker-wrap">
                    <div className="list-tag rounded-0 fz12">
                      PARKING STATION
                    </div>
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link href={`/parking/${item.ownerID}`}>{item.owner_name}</Link>
                  </h6>
                  <p className="list-text">{item.owner_address}</p>
                  <div className="list-meta d-flex align-items-center">
                    <span>
                      📍 {item.latitude}, {item.longitude}
                    </span>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">Available Plots: {item.plots.length}</span>
                    <div className="pricing">
                      {item.pricing.map((price) => (
                        <span key={price.id} className="me-2">
                          {price.vehicle_type}: ₹{price.hourly_rate}/hr
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default NearbySimilarProperty;
