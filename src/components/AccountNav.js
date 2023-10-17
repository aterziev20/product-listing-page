import React from "react";
import { Link } from "react-router-dom";

import "./styles/AccountNav.css";

function AccountNav() {
  return (
    <div>
      <div className="acc-link-wrapper">
        <div className="acc-link-container">
          <Link to={`/${`Help`.toLowerCase()}`} className="acc-link">
            Help
          </Link>
          <div className="acc-line"></div>
          <Link to={`/${`JoinUs`.toLowerCase()}`} className="acc-link">
            Join Us
          </Link>
          <div className="acc-line"></div>
          <Link to={`/${`SignIn`.toLowerCase()}`} className="acc-link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountNav;
