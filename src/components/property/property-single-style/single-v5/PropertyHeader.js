"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";


const PropertyHeader = ({ id }) => {
  const { ownerID } = useParams();
  const [parkingStation, setParkingStation] = useState(null);

  const apiEndpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/user/parking/stations/`);
        const parkingData = response.data.data;

        const ownerData = parkingData.find((item) => item.ownerID === ownerID);

        if (ownerData) {
          setParkingStation(ownerData);
        } else {
          setParkingStation(null);
        }
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    if (ownerID) {
      fetchStations();
    }
  }, [ownerID, apiEndpoint]);

  if (!parkingStation) {
    return null;
  }

  const data = parkingStation;
  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.owner_name}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {data.owner_address}
            </p>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              {data.owner_email}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="far fa-clock pe-2" />{data.owner_phone}
            </a>
            <a className="ff-heading ml10 ml0-sm fz15" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              {data.ownerID}
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-new-tab" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#">
                <span className="flaticon-printer" />
              </a>
            </div>
            <h3 className="price mb-0">
              {data.pricing?.[0]?.hourly_rate ?? 'N/A'}
            </h3>

          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
