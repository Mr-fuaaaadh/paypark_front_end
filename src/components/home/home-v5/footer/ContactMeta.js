import React from "react";

const ContactMeta = () => {
  const contactInfoData = [
    {
      text: "Parking Address",
      info: "123 Parking Lane, Downtown City, XYZ 45678.",
      link: "#",
    },
    {
      text: "Parking Support Hotline",
      info: "+(0) 987 654 3210",
      link: "tel:+09876543210",
    },
    {
      text: "Payment Assistance",
      info: "support@payparking.com",
      link: "mailto:support@payparking.com",
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoData.map((contact, index) => (
        <div className="contact-info mb25" key={index}>
          <p className="info-title mb5">{contact.text}</p>
          {contact.link.startsWith("mailto:") ? (
            <h6 className="info-mail">
              <a href={contact.link}>{contact.info}</a>
            </h6>
          ) : (
            <h6 className="info-phone">
              <a href={contact.link}>{contact.info}</a>
            </h6>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;