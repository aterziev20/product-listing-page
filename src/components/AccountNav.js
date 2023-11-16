import React from "react";
import { Link } from "react-router-dom";

import "./styles/AccountNav.css";

function AccountNav() {
  return (
    <div>
      <div className="acc-link-wrapper">
        <div className="acc-link-container">
          {/* to={`/${`Help`.toLowerCase()}`} */}
          <Link className="acc-link" to={`/`}>Help</Link>
          <div className="acc-line"></div>
          {/* to={`/${`JoinUs`.toLowerCase()}`} */}
          <Link className="acc-link" to={`/`}>Join Us</Link>
          <div className="acc-line"></div>
          {/* to={`/${`SignIn`.toLowerCase()}`} */}
          <Link className="acc-link" to={`/`}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default AccountNav;
