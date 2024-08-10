import React from "react";
import SidebarReact from "../components/SidebarReact";

function Layout({ children }) {
  return (
    <div>
      <SidebarReact />
      {children}
    </div>
  );
}

export default Layout;
