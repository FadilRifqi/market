import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiBitcoin } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";
import { Sidebar } from "flowbite-react";

const SidebarReact = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex relative">
      <button
        className={`p-2 text-gray-500 focus:outline-none ${
          isSidebarOpen ? "absolute top-4 right-10" : "absolute top-4 left-4"
        }`}
        onClick={toggleSidebar}
      >
        <HiMenu className="w-6 h-6" />
      </button>
      {isSidebarOpen && (
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="h-full"
        >
          <Sidebar.Items className="h-full flex flex-col">
            <Sidebar.ItemGroup className="flex-1">
              <Link to={"/"}>
                <Sidebar.Item icon={CiBitcoin}>Coin</Sidebar.Item>
              </Link>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
      <div className="flex-1 p-4">{/* Main content goes here */}</div>
    </div>
  );
};

export default SidebarReact;
