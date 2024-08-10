import React from "react";
import SidebarReact from "../components/SidebarReact";

function Layout({ children }) {
  return (
    <div className="flex">
      <SidebarReact />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

export default Layout;
