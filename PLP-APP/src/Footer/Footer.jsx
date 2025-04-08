import React from "react";

const Footer = () => {
  return (
    <footer className="p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-8 mb-8">
          {/* Newsletter Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-bold mb-2">BE THE FIRST TO KNOW</h2>
            <p className="mb-4">Sign up for updates from mettā muse.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your e-mail..."
                className="p-2 w-full md:w-64 bg-white text-gray-800 border border-gray-600   focus:outline-none"
              />
              <button className="p-2 bg-black-700 border-2 border-gray-600 rounded-md text-gray-600 ml-2">
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Contact and Currency */}
          <div className="flex flex-col md:flex-col md:space-x-16 gap-3">
            {/* Contact */}
            <div className="mb-8 md:mb-0 space-y-2.5">
              <h2 className="text-lg font-bold mb-2">CONTACT US</h2>
              <p>+44 221 133 5360</p>
              <p>customercare@mettamuse.com</p>
            </div>
            {/* Currency */}
            <div className="space-y-2.5">
              <h2 className="text-lg font-bold mb-2">CURRENCY</h2>
              <p className="flex items-center">
                <img
                  src="https://storage.googleapis.com/a1aa/image/1qbmxygIheOnnoEYLLg6BP8SNrpXmcnop3qgp6SCaZs.jpg"
                  alt="US Flag"
                  width="20"
                  height="20"
                  className="mr-2"
                />
                USD
              </p>
              <p>
                Transactions will be completed in Euros and a currency reference
                is available on hover.
              </p>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* About */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-bold mb-4">mettā muse</h2>
            <ul>
              {[
                "About Us",
                "Stories",
                "Artisans",
                "Boutiques",
                "Contact Us",
                "EU Compliances Docs",
              ].map((item, i) => (
                <li className="mb-2" key={i}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-bold mb-4">QUICK LINKS</h2>
            <ul>
              {[
                "Orders & Shipping",
                "Join/Login as a Seller",
                "Payment & Pricing",
                "Return & Refunds",
                "FAQs",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item, i) => (
                <li className="mb-2" key={i}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Payments */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-bold mb-4">FOLLOW US</h2>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            <h2 className="text-lg font-bold mb-4">mettā muse ACCEPTS</h2>
            <div className="flex space-x-2">
              {[
                {
                  alt: "GPay",
                  src: "https://storage.googleapis.com/a1aa/image/xVNQW_439p5_b1BYa4_HPtTkXZJ_iKLv4wQuahejMOI.jpg",
                },
                {
                  alt: "Visa",
                  src: "https://storage.googleapis.com/a1aa/image/-Qxt2WEqbjTq-s1X0_YJyKqHP-PUO-fk2UAz9wkwOmw.jpg",
                },
                {
                  alt: "MasterCard",
                  src: "https://storage.googleapis.com/a1aa/image/YI5fGWyXtTRLa1UnMiCaFFc39JpLqT--3ez6_TBBwlw.jpg",
                },
                {
                  alt: "Amex",
                  src: "https://storage.googleapis.com/a1aa/image/C337ld6hwwxeEDxn5nbOq8zoucMTkD1hXMwCU2PSLBw.jpg",
                },
                {
                  alt: "Apple Pay",
                  src: "https://storage.googleapis.com/a1aa/image/hQ7_hF_QoHaMmgvSU7wcEyDXgjcDO0c2qnHQvc6fTqg.jpg",
                },
                {
                  alt: "PayPal",
                  src: "https://storage.googleapis.com/a1aa/image/Ywtc1UU5MPNnJUVe_o47a7ZX20MKwVpTe7ct80AdcWs.jpg",
                },
              ].map((item, i) => (
                <img
                  key={i}
                  src={item.src}
                  alt={item.alt}
                  width="40"
                  height="20"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8">
          <p>Copyright © 2023 mettamuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
