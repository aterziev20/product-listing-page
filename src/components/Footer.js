import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Main Sections</h4>
          <div className="footer-links">
            <Link className="link upc">find a store</Link>
            <Link className="link upc">become a member</Link>
            <Link className="link upc">feedback</Link>
            <Link className="link upc">promo codes</Link>
          </div>
        </div>
        <div className="footer-section">
          <h4>GET HELP</h4>
          <div className="footer-links">
            <Link className="link cap">order status</Link>
            <Link className="link cap">shipping & delivery</Link>
            <Link className="link cap">returns</Link>
            <Link className="link cap">contact us</Link>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="footer-info">
        <p>© 2023 LuaMSports, Inc. All Rights Reserved</p>
        <div className="footer-sublinks">
          <Link className="link-lower cap">terms <span className="lwc">of</span> use</Link>
          <Link className="link-lower cap">terms <span className="lwc">of</span> sale</Link>
          <Link className="link-lower cap">company details</Link>
          <Link className="link-lower cap">privacy & cookie policy</Link>
          <Link className="link-lower cap">cookie settings</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
