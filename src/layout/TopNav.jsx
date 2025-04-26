import React from "react";
import { ICON_HELPER } from "../helper/icon_helper";

const TopNav = ({ onToggleSidebar, collapsed }) => {
  return (
    <div className={`shadow-b-lg bg-gray-100 h-[60px] w-full fixed top-0 z-10 flex items-center justify-between px-4 transition-all duration-300 ${collapsed ? "left-[70px]" : "left-[200px]"}`}>
      <div className="text-white flex items-center space-x-8">
        <h1 className="text-4xl cursor-pointer text-black" onClick={onToggleSidebar}>
          <ICON_HELPER.MENU_ICON />
        </h1>
        <input placeholder="Search" className="rounded-4xl bg-white text-black p-2 w-[250px]" />
      </div>
    </div>
  );
};

export default TopNav;
