import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import AddEmployee from "../pages/AddEmployee";
import AddProject from "../pages/AddProject";
import DashBoard from "../pages/DashBoard";
import ProjectTask from "../pages/ProjectTask";

const dashboard_routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <DashBoard /> }],
  },
  {
    path: "/add-employee",
    element: <Layout />,
    children: [{ path: "/add-employee", element: <AddEmployee /> }],
  },
  {
    path: "/add-project-task",
    element: <Layout />,
    children: [{ path: "/add-project-task", element: <ProjectTask /> }],
  },
  {
    path: "/add-project",
    element: <Layout />,
    children: [{ path: "/add-project", element: <AddProject /> }],
  },
];

const router = createBrowserRouter([...dashboard_routes]);

export default router;
