import React from "react";
import { Input } from "antd";

const CustomInput = ({ label, placeholder, required, error, controllerField }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Input {...controllerField} placeholder={placeholder} className={`!h-[50px] ${error ? "border-red-500" : ""}`} />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
