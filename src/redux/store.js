import { configureStore } from "@reduxjs/toolkit";
import { addEmployee } from "./slices/employeeSlices";

export const store = configureStore({
  reducer: {
    employees: addEmployee,
  },
});
