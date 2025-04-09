"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const GalleryBox = () => {
  const { ownerID } = useParams();
  const [images, setImages] = useState([]);
  const apiEndpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/user/parking/stations/`); // Replace with your actual API endpoint
        const parkingData = response.data.data;

        // Find the parking station that matches the ownerID
        const ownerData = parkingData.find((item) => item.ownerID === ownerID);

        if (ownerData && ownerData.images) {
          // Extract images
          setImages(ownerData.images.map((img) => img.image));
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (ownerID) {
      fetchImages();
    }
  }, [ownerID,apiEndpoint]);


  return (
    <>
      <Swiper
        spaceBetween={0}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".single-pro-slide-next__active",
          prevEl: ".single-pro-slide-prev__active",
        }}
        slidesPerView={1}
        loop={true}
        speed={1000}
      >
        {images.length > 0 ? (
          images.map((image, index) => (

          <SwiperSlide key={index}>
            <div className="item">
              <Image
                width={1519}
                height={400}
                className=" w-100 h-100 cover"
                src={`${apiEndpoint}${image}`}
                alt={`Image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p>No images found for this owner.</p>
      )}

      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="single-pro-slide-prev__active swiper_button _prev">
          <i className="far fa-arrow-left-long" />
        </button>
        {/* End prev */}

        <button className="single-pro-slide-next__active swiper_button _next">
          <i className="far fa-arrow-right-long" />
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default GalleryBox;
