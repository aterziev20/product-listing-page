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
            <Link className="link">FIND A STORE</Link>
            <Link className="link">BECOME A MEMBER</Link>
            <Link className="link">Feedback</Link>
            <Link className="link">PROMO CODES</Link>
          </div>
        </div>
        <div className="footer-section">
          <h4>GET HELP</h4>
          <div className="footer-links">
            <Link className="link">Order Status</Link>
            <Link className="link">Shipping and Delivery</Link>
            <Link className="link">Returns</Link>
            <Link className="link">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="footer-info">
        <p>© 2023 LuaMSports, Inc. All Rights Reserved</p>
        <div className="footer-sublinks">
          <Link className="link-lower">Terms of Use</Link>
          <Link className="link-lower">Terms of Sale</Link>
          <Link className="link-lower">Company Details</Link>
          <Link className="link-lower">Privacy & Cookie Policy</Link>
          <Link className="link-lower">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
