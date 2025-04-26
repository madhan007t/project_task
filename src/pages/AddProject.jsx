import React, { useEffect, useState } from "react";
import { Card, Button, Popconfirm, Modal, Form, Input, DatePicker, Select, Upload, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../helper/message_helper";

const AddProject = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects")) || []);
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
  }, []);

  const openAddModal = () => {
    try {
      setEditingProject(null);
      form.resetFields();
      setFileList([]);
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    form.setFieldsValue({ ...proj, startDate: dayjs(proj.startDate), endDate: dayjs(proj.endDate) });
    setFileList([{ uid: "-1", url: proj.logo }]);
    setIsModalOpen(true);
  };

  const handleDelete = (title) => {
    try {
      const updated = projects.filter((p) => p.title !== title);
      localStorage.setItem("projects", JSON.stringify(updated));
      setProjects(updated);
      SUCCESS_NOTIFICATION("Project Deleted!");
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const handleFinish = (values) => {
    try {
      const logo = fileList[0]?.thumbUrl || editingProject?.logo || "";
      const newProject = { ...values, logo, startDate: values.startDate.toISOString(), endDate: values.endDate.toISOString() };
      const updated = editingProject ? projects.map((p) => (p.title === editingProject.title ? newProject : p)) : [...projects, newProject];
      localStorage.setItem("projects", JSON.stringify(updated));
      setProjects(updated);
      SUCCESS_NOTIFICATION(editingProject ? "Project Updated!" : "Project Added!");
      setIsModalOpen(false);
      setFileList([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Project Management</h2>
        <CustomButton type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Add Project +
        </CustomButton>
      </div>

      <CustomModal title={editingProject ? "Edit Project" : "Add Project"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleFinish} className="grid grid-cols-2 gap-5">
          <Form.Item name="title" label="Project Title" rules={[{ required: true }]}>
            <Input className="h-[50px]" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={2} className="h-[50px]" />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <DatePicker className="w-full h-[50px]" />
          </Form.Item>
          <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
            <DatePicker className="w-full h-[50px]" />
          </Form.Item>
          <Form.Item name="employees" label="Assign Employees" rules={[{ required: true }]}>
            <Select mode="multiple" options={employees.map((e) => ({ label: e.name, value: e.name }))} className="h-[50px]" />
          </Form.Item>
          <Form.Item label="Project Logo">
            <Upload.Dragger
              listType="picture"
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
              fileList={fileList}
              onRemove={() => setFileList([])}
            >
              Drag & Drop
            </Upload.Dragger>
          </Form.Item>
          <CustomButton type="primary" htmlType="submit" className="w-full mt-2">
            {editingProject ? "Update" : "Create"}
          </CustomButton>
        </Form>
      </CustomModal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <Card
            key={i}
            cover={<img alt="Logo" src={p.logo} className="h-40 object-cover" />}
            actions={[
              <EditOutlined onClick={() => openEditModal(p)} />,
              <Popconfirm title="Delete this project?" onConfirm={() => handleDelete(p.title)}>
                <DeleteOutlined />
              </Popconfirm>,
            ]}
          >
            <Card.Meta title={p.title} description={p.description} />
            <p className="text-xs text-gray-500 mt-2">
              {p.startDate.slice(0, 10)} ➜ {p.endDate.slice(0, 10)}
            </p>
            <div className="mt-2">
              {p.employees.map((e) => (
                <Tag key={e}>{e}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddProject;
