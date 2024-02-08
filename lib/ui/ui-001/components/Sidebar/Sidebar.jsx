import { faFloppyDisk, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import initMenus from "../../data/menus.js";
import "./sidebar.css";
import Logo from "./Logo.jsx";
import SidebarSearch from "./SidebarSearch.jsx";
import Wallet from "../Wallet/connectWallets.jsx"
import MenuList from "./MenuList.jsx";
import { useNavigate } from "react-router-dom";

function Sidebar({ ...props }) {
  const navigate = useNavigate();
  const [menus, setMenus] = useState(initMenus);
  const [scButton, setScButton] = useState(false);
  const search = useRef("");

  const handleChange = (e) => {
    if (e.target.value) {
      setScButton(true);
      setMenus(
        menus.filter((el) => {
          return el.label.toLowerCase().includes(e.target.value.toLowerCase());
        })
      );
    } else {
      setScButton(false);
      setMenus(initMenus);
    }
  };

  
  return (
    <>
      <aside
        id="sidebar"
        className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50 no-scrollbar ${props.className}`}
      >
        {/* Sidebar wrapper */}
        <div className="md:w-64 border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
          {/* Logo */}
          <Logo toggle={props.toggle} icon={faFloppyDisk} text="Lentož" />
			 
          {/* Menu */}
          <MenuList menus={menus} toggle={props.toggle} />
			  
			  <div className="pt-2 border-t border-gray-300">
            <div className="py-2 px-4 mx:auto">
              
					{/* Wallet Button */}
              <Wallet />
            </div>
          </div>
          
        </div>
		  
		  
		  
      </aside>

      {props.className === "mobile" && (
        <div
          id="overlaySidebar"
          onClick={props.toggle}
          className="hidden absolute w-full h-screen bg-black z-10 inset-0 opacity-60"
        >
          <div></div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
