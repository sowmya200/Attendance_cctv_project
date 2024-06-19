import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleUser,
  faUser,
  faCalendarDays,
  faDatabase,
  faArrowsToEye,
  faFile,
  faDesktop,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [active, setActive] = useState("LiveTracking");
const showActive=false
  const navItems = [
    { name: "LiveTracking", icon: faArrowsToEye,  showActive:true, path: "/LiveTracking" },
    // { name: "Search By", icon: faUser, showActive:false},
    { name: "Chronosearch", icon: faCalendarDays,  showActive:true, path: "/SearchByDate" },
    { name: "ID Lookup", icon: faCircleUser,showActive:true, path: "/SearchByEmpId" },
    // { name: "Report", icon: faFile,showActive:false },
    { name: "Intrusion Report", icon: faMessage,  showActive:true,path: "/Intruders" },
    { name: "Connection Log", icon:faDesktop,showActive:true, path: "/Connectivity" },
    { name: "Database", icon:faDatabase, showActive:true,path: "/Database" },
    { name: "Logout", icon: faArrowRightFromBracket,showActive:true, path: "/" }
  ];

  return (
    <div className="w-64 h-vh bg-[#4D989D] bg-opacity-20 font-regular text-white flex flex-col pt-10 pr-5">
      {navItems.map((item, index) => (
        <NavLink
          key={index} 
          to={item.path}
          className={({ isActive}) =>
            `flex items-center p-2 my-2 transition-colors duration-0 justify-start ${
             item.showActive && isActive? "bg-[#4D989D] py-3 rounded-r-full pb-4 w-64" : "text-black py-3 pb-4"
            }`
          }
          onClick={() => setActive(item.name)}
        >
          <div className="pl-9">
            <FontAwesomeIcon icon={item.icon} className="ml-1 mr-3 text-lg" />
            <span className=" pr-1 ml-4">{item.name}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
export default Sidebar
