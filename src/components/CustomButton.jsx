import React from "react";

const CustomButton = ({ onClick, type = "submit", children }) => {
  return (
    <div>
      <button onClick={onClick} type={type} className="px-4 py-2 bg-black text-white font-primary font-bold rounded">
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
