"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarReact = () => {
  const location = useLocation();
  const [username, setUsername] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setSelectedImage(savedProfilePicture);
    }
  }, []);
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={selectedImage || "/favicon.ico"}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {username ? username : "Bitcoin"}
            </span>
          </Dropdown.Header>
          <Link to={"/"}>
            <Dropdown.Item>Coins</Dropdown.Item>
          </Link>
          <Link to={"/settings"}>
            <Dropdown.Item>Settings</Dropdown.Item>
          </Link>
          {/* <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item> */}
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to={"/"}>
          <Navbar.Link active={location.pathname === "/"}>Home</Navbar.Link>
        </Link>
        <Link to={"/about"}>
          <Navbar.Link active={location.pathname === "/about"}>
            About
          </Navbar.Link>
        </Link>
        <Link to={"/services"}>
          <Navbar.Link active={location.pathname === "/services"}>
            Services
          </Navbar.Link>
        </Link>
        <Link to={"/pricing"}>
          <Navbar.Link active={location.pathname === "/pricing"}>
            Pricing
          </Navbar.Link>
        </Link>
        <Link to={"/contact"}>
          <Navbar.Link active={location.pathname === "/contact"}>
            Contact
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarReact;
