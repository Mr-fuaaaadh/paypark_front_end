// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* Move the Script tag here */}
          <Script
            strategy="beforeInteractive"
            srsrc="https://checkout.razorpay.com/v1/checkout.js"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
