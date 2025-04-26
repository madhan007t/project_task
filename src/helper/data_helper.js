import { ICON_HELPER } from "./icon_helper";

export const menu_items = [
  {
    id: 1,
    name: "Dashboard",
    icon: ICON_HELPER.DASHBOARD_ICONS,
    to: "/",
  },
  {
    id: 2,
    name: "Employee",
    icon: ICON_HELPER.USERS_ICONS,
    to: "/add-employee",
  },
  {
    id: 3,
    name: "Add Project",
    icon: ICON_HELPER.PROJECT_ICONS,
    to: "/add-project",
  },
  {
    id: 4,
    name: "Add Task",
    icon: ICON_HELPER.TASK_ICONS,
    to: "/add-project-task",
  },
];
