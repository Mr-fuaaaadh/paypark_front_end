import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import Office from "@/components/pages/contact/Office";

export const metadata = {
  title: "Contact || Homez - Real Estate NextJS Template",
};

const Contact = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav */}
      <MobileMenu />
      {/* End Mobile Nav */}

      {/* Our Contact With Map */}
      <section className="p-0">
      <iframe
          className="home8-map contact-page"
          loading="lazy"
          src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=14&output=embed&iwloc=near"
          title="London Eye, London, United Kingdom"
          aria-label="London Eye, London, United Kingdom"
        />
      </section>
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section>
        <div className="container">
          <div className="row d-flex align-items-end">
            <div className="col-lg-5 position-relative">
              <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                <h4 className="form-title mb25">
                  Have questions? Get in touch!
                </h4>
                <Form />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-5 offset-lg-2">
              <h2 className="mb30 text-capitalize">
                We’d love to hear <br className="d-none d-lg-block" />
                from you.
              </h2>
              <p className="text">
                We are here to answer any question you may have. As a partner of
                corporates, realton has more than 9,000 offices of all sizes and
                all potential of session.
              </p>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form */}

      {/* Visit our Office */}
      <section className="pt0 pb90 pb10-md">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="main-title text-center">
                <h2 className="title">Visit Our Office</h2>
                <p className="paragraph">
                  Realton has multiple offices across India. Below are our office locations:
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-4">
              <h4>Kerala</h4>
              <p>
                <strong>Address:</strong> 123 ABC Road, Kochi, Kerala, India
              </p>
              <p>
                <strong>Phone:</strong> +91 123 456 7890
              </p>
            </div>
            <div className="col-lg-4">
              <h4>Bangalore</h4>
              <p>
                <strong>Address:</strong> 456 XYZ Avenue, Bangalore, Karnataka, India
              </p>
              <p>
                <strong>Phone:</strong> +91 987 654 3210
              </p>
            </div>
            <div className="col-lg-4">
              <h4>Delhi</h4>
              <p>
                <strong>Address:</strong> 789 DEF Lane, New Delhi, Delhi, India
              </p>
              <p>
                <strong>Phone:</strong> +91 555 123 4567
              </p>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Visit our Office */}

      {/* Pay and Parking Information */}
      <section className="pt60 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-title text-center">
                <h2 className="title">Payment & Parking Information</h2>
                <p className="paragraph">
                  We offer convenient payment options and ample parking space
                  for visitors. Here’s what you need to know:
                </p>
              </div>
            </div>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-6">
              <h4>Payment Methods</h4>
              <p>
                We accept a variety of payment methods, including credit/debit
                cards, mobile wallets, and online payment systems. You can make
                payments securely at the time of your visit or through our
                online payment portal.
              </p>
            </div>
            <div className="col-lg-6">
              <h4>Parking Information</h4>
              <p>
                Our office provides free parking for visitors. You can park
                conveniently at the designated parking area just outside our
                building. If you’re using public transport, our office is easily
                accessible by bus and train.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End Pay and Parking Information */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Contact;
