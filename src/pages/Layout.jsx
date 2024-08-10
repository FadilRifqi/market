import React from "react";
import NavbarReact from "../components/Navbar";
function Layout({ children }) {
  return (
    <div className="">
      <NavbarReact />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

export default Layout;
