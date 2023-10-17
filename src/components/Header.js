import React from "react";

import AccountNav from "./AccountNav";
import NavBar from "./NavBar";
import PromoNav from "./PromoNav";

function Header() {
  return (
    <div>
      <AccountNav />
      <NavBar />
      <PromoNav />
    </div>
  );
}

export default Header;
