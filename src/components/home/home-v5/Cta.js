import Link from "next/link";
import React from "react";

const Cta = () => {
  return (
    <section
      className="cta-banner4 d-flex align-items-center"
      style={{
        backgroundImage: "url('/images/backrounf.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-10 mx-auto" data-aos="fade-in">
            <div className="cta-style4 position-relative text-center">
              <h6 className="sub-title fw400 text-white">BUY OR SELL</h6>
              <h1 className="cta-title mb30 text-white">
                Looking to Buy a new property or sell an existing one? Realton
                provides an awesome solution!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
