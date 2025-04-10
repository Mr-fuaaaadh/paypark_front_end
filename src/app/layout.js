"use client";

import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ CSS is safe to import globally

import { DM_Sans, Poppins } from "next/font/google";
import { useEffect } from "react";

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    // Ensure this only runs on client side
    if (typeof window !== 'undefined') {
      Aos.init({ duration: 1200, once: true });
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`body ${poppins.className} ${dmSans.className}`}>
        <div className="wrapper ovh">{children}</div>
        <ScrollToTop />
      </body>
    </html>
  );
}
