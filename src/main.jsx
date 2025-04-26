import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
