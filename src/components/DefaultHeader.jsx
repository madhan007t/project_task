import React from "react";

const DefaultHeader = ({ title }) => {
  return (
    <div className="h-[50px] !bg-white px-4 rounded-lg mb-2 flex items-center  font-medium text-black justify-between">
      <div className="font-primary font-bold text-2xl pt-10">{title}</div>
    </div>
  );
};

export default DefaultHeader;
