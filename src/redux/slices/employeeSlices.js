import { createSlice } from "@reduxjs/toolkit";

const employeeSlices = createSlice({
  name: "employees",
  initialState: {
    list: JSON.parse(localStorage.getItem("employees")) || [],
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload); // email check now handled outside
    },
  },
});

export const { addEmployee } = employeeSlices.actions;
export default employeeSlices.reducer;
