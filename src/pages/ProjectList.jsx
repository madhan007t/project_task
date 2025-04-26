import React, { useEffect, useState } from "react";
import { Card, Button, Popconfirm, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  const handleDelete = (title) => {
    const updatedProjects = projects.filter((proj) => proj.title !== title);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    message.success("Project deleted successfully!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {projects.map((project, index) => (
        <Card
          key={index}
          cover={<img alt="Project Logo" src={project.logo} className="h-48 object-cover" />}
          actions={[
            <EditOutlined key="edit" onClick={() => message.info("Edit feature coming soon!")} />,
            <Popconfirm title="Are you sure to delete this project?" onConfirm={() => handleDelete(project.title)} okText="Yes" cancelText="No">
              <DeleteOutlined key="delete" />
            </Popconfirm>,
          ]}
        >
          <Card.Meta
            title={project.title}
            description={
              <>
                <p>{project.description}</p>
                <p className="mt-2 text-sm text-gray-500">{`Start: ${project.startDate.substring(0, 10)} | End: ${project.endDate.substring(0, 10)}`}</p>
                <div className="mt-2">
                  {project.employees.map((emp) => (
                    <Tag color="blue" key={emp}>
                      {emp}
                    </Tag>
                  ))}
                </div>
              </>
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
