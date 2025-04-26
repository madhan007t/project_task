import React, { useEffect, useState } from "react";
import { Card } from "antd";
import DefaultHeader from "../components/DefaultHeader";

const DashBoard = () => {
  const [stats, setStats] = useState({
    employees: 0,
    projects: 0,
    tasks: 0,
  });

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    setStats({
      employees: employees.length,
      projects: projects.length,
      tasks: tasks.length,
    });
  }, []);

  const cardData = [
    { title: "Total Employees", count: stats.employees },
    { title: "Total Projects", count: stats.projects },
    { title: "Total Tasks", count: stats.tasks },
  ];

  return (
    <div>
      <DefaultHeader title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cardData.map((item, index) => (
          <Card key={index} bordered hoverable className="text-center shadow">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-2xl font-bold mt-2">{item.count}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
