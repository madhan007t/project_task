import React, { useState } from "react";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen">
      <SideNav collapsed={collapsed} />
      <div className="flex flex-1 flex-col">
        <TopNav onToggleSidebar={handleToggle} collapsed={collapsed} />
        <div className="p-4 mt-[50px] overflow-auto transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
