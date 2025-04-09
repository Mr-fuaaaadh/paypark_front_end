import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Pay & Pricing",
      links: [
        { label: "Payment Methods", href: "#" },
        { label: "Subscription Plans", href: "#" },
        { label: "Refund Policy", href: "#" },
        { label: "Discounts & Offers", href: "#" },
      ],
    },
    {
      title: "Parking & Facilities",
      links: [
        { label: "Parking Availability", href: "#" },
        { label: "Building Facilities", href: "#" },
        { label: "Security Measures", href: "#" },
        { label: "Accessibility Features", href: "#" },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-sm-6 col-lg-3" key={index}>
          <div className="footer-widget mb-4 mb-lg-5 ps-0 ps-lg-5">
            <div className="link-style1 mb-3">
              <h6 className="text-white mb25">{section.title}</h6>
              <ul className="ps-0">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;