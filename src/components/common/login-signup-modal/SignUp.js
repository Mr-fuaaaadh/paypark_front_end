"use client"
import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    vehicle_number: "",
    model_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here, you can send formData to your backend API
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          className="form-control"
          placeholder="Enter Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Vehicle Number</label>
        <input
          type="text"
          name="vehicle_number"
          className="form-control"
          placeholder="Enter Vehicle Number"
          value={formData.vehicle_number}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Model Number</label>
        <input
          type="text"
          name="model_number"
          className="form-control"
          placeholder="Enter Model Number"
          value={formData.model_number}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb20">
        <label className="form-label fw600 dark-color">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Create account <i className="fal fa-arrow-right-long" />
        </button>
      </div>

      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue with Google
        </button>
      </div>
      <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue with Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue with Apple
        </button>
      </div>

      <p className="dark-color text-center mb0 mt10">
        Already Have an Account?{" "}
        <Link className="dark-color fw600" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
