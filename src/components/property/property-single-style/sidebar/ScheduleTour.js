"use client";

import React, { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import axios from "axios";
import { useParams } from "next/navigation";

const ScheduleTour = () => {
  // States for date/time
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  // States for plots & pricing
  const [plots, setPlots] = useState([]); // array of plot objects
  const [selectedPlot, setSelectedPlot] = useState("");
  const [pricings, setPricings] = useState([]); // array of { id, vehicle_type, hourly_rate } objects
  const [vehicleType, setVehicleType] = useState("");

  // Calculated amount
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  // Environment variables (ensure these are set in your .env file)
  const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const apiEndpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

  // Since localStorage is only available on the client, check for window existence.
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // Get ownerID from route params
  const { ownerID } = useParams();

  // --------------------------------------------------------------------------
  // 1. Fetch parking data (plots + pricing) based on the ownerID
  // --------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      if (!apiEndpoint) {
        console.error("API endpoint is missing");
        return;
      }

      try {
        const response = await axios.get(`${apiEndpoint}/user/parking/stations/`);
        const parkingData = response?.data?.data || [];

        // Find the matching owner by ID
        const ownerData = parkingData.find((item) => item.ownerID === ownerID);

        // Set the array of plots and pricing
        if (ownerData) {
          setPlots(ownerData.plots || []);
          setPricings(ownerData.pricing || []);
        }
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    };

    if (ownerID) fetchData();
  }, [ownerID, apiEndpoint]);

  // --------------------------------------------------------------------------
  // 2. Calculate total cost whenever date/time or vehicle type changes
  // --------------------------------------------------------------------------
  const calculateAmount = useCallback(() => {
    try {
      // Only calculate if we have valid date/time and a selected pricing
      if (
        !startDate ||
        !startTime ||
        !endDate ||
        !endTime ||
        !vehicleType
      ) {
        setCalculatedAmount(0);
        return;
      }

      const selectedPricing = pricings.find(
        (p) => p.id === parseInt(vehicleType)
      );
      if (!selectedPricing) {
        setCalculatedAmount(0);
        return;
      }

      const hourlyRate = selectedPricing.hourly_rate;
      // Parse the start & end as Date objects
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);

      // Calculate difference in hours
      const diffMs = end.getTime() - start.getTime();
      if (diffMs <= 0) {
        setCalculatedAmount(0);
        return;
      }
      const diffHrs = diffMs / (1000 * 60 * 60); // difference in hours (can be fractional)

      // Calculate total cost (hourly rate * hours)
      const cost = diffHrs * hourlyRate;
      setCalculatedAmount(cost);
    } catch (error) {
      console.error("Error calculating amount:", error);
      setCalculatedAmount(0);
    }
  }, [startDate, startTime, endDate, endTime, vehicleType, pricings]);

  useEffect(() => {
    calculateAmount();
  }, [calculateAmount]);

  // --------------------------------------------------------------------------
  // 3. Handle the submission (initiating payment)
  // --------------------------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (calculatedAmount <= 0) {
      alert("Invalid date/time selection or vehicle type. Please check again.");
      return;
    }
  
    try {
      const amountInPaise = Math.round(calculatedAmount);
  
      // Combine date and time into a single datetime string
      const startDateTime = `${startDate}T${startTime}:00Z`;
      const endDateTime = `${endDate}T${endTime}:00Z`;
  
      const dataToSend = {
        start_time: startDateTime,
        end_time: endDateTime,
        plot_id: selectedPlot,
        vehicle_type: vehicleType,
        amount: amountInPaise,
      };
  
      const response = await fetch(`${apiEndpoint}/api/payment/initiate/`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse JSON error response
  
        // Handle validation errors (400 response)
        if (response.status === 400) {
          if (errorData.error) {
            const errorMessages = Object.entries(errorData.error)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("\n");
            throw new Error(errorMessages);
          }
        }
  
        throw new Error("Failed to create Razorpay order.");
      }
  
      const orderData = await response.json();
  
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Parking Reservation",
        description: "Parking slot reservation payment",
        order_id: orderData.order_id,
        handler: async function (res) {
          try {
            const verifyRes = await fetch(`${apiEndpoint}/api/payment/verify/`, {
              method: "POST",
              headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_order_id: res.razorpay_order_id,
                razorpay_signature: res.razorpay_signature,
              }),
            });
  
            if (!verifyRes.ok) {
              throw new Error("Payment verification failed");
            }
  
            // const verifyData = await verifyRes.json();
            // alert("Payment successful and verified! " + verifyData.message);
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert("Payment succeeded but verification failed!");
          }
        },
        modal: {
          ondismiss: function () {
            alert("Payment popup closed. Payment not completed.");
          },
        },
      };
  
      // Fallback for Razorpay script loading
      if (typeof window.Razorpay === "undefined") {
        try {
          await loadRazorpayScript();
        } catch (error) {
          console.error(error);
          alert("Failed to load Razorpay script. Please try again later.");
          return;
        }
      }
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("Something went wrong. Try again!");
    }
  };

  // --------------------------------------------------------------------------
  // 4. Render UI
  // --------------------------------------------------------------------------
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="ps-navtab">
        <div className="tab-content" id="pills-tabContent">
          <form className="form-style1" onSubmit={handleSubmit}>
            <div className="row">
              {/* Start Date & Time */}
              <div className="col-md-6">
                <div className="mb20">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb20">
                  <label>Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>

              {/* End Date & Time */}
              <div className="col-md-6">
                <div className="mb20">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb20">
                  <label>End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Plot Selection */}
              <div className="col-md-12">
                <div className="mb20">
                  <label>Select a Parking Plot</label>
                  <select
                    className="form-control"
                    required
                    value={selectedPlot}
                    onChange={(e) => setSelectedPlot(e.target.value)}
                  >
                    <option value="">-- Select a Parking Plot --</option>
                    {plots.map((plot) => (
                      <option key={plot.id} value={plot.id}>
                        {plot.plot_no}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Type (Pricing) */}
              <div className="col-md-12">
                <div className="mb20">
                  <label>Select Vehicle Type</label>
                  <select
                    className="form-control"
                    required
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="">-- Select Vehicle Type --</option>
                    {pricings.map((price) => (
                      <option key={price.id} value={price.id}>
                        {price.vehicle_type} (₹ {price.hourly_rate}/hr)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Display Calculated Amount & Submit */}
              <div className="col-md-12">
                <div className="d-grid">
                  <button type="submit" className="ud-btn btn-thm">
                    Pay ₹ {calculatedAmount.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ScheduleTour;
