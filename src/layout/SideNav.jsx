import React from "react";
import { menu_items } from "../helper/data_helper";
import { Link } from "react-router-dom";

const SideNav = ({ collapsed }) => {
  return (
    <div className={`${collapsed ? "w-[60px]" : "w-[200px]"} h-screen bg-gray-100 shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-center h-[60px] border-b border-gray-300">{collapsed ? <span className="font-bold text-xl">P</span> : <h1 className="font-bold text-2xl">PROJECT TASK</h1>}</div>

      <div className="pt-6 overflow-y-auto">
        {menu_items.map((res, index) => {
          const Icon = res.icon;
          return (
            <Link key={index} to={res.to} className={`flex items-center ${collapsed ? "justify-center" : "gap-4 px-4"} py-4 border-b border-gray-300 hover:bg-gray-200 transition`}>
              <Icon size={24} />
              {!collapsed && <span className="font-semibold">{res.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
