import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Select, Upload, Input, DatePicker, message, Popconfirm } from "antd";
import { BsInboxes } from "react-icons/bs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DefaultHeader from "../components/DefaultHeader";
import dayjs from "dayjs";
import CustomButtom from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../helper/message_helper";

const ProjectTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects")) || []);
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
  }, []);

  const openAddModal = () => {
    setEditingTask(null);
    form.resetFields();
    setFileList([]);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      ...task,
      eta: dayjs(task.eta),
    });
    setFileList(task.referenceImage ? [{ uid: "-1", url: task.referenceImage }] : []);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    try {
      const updated = tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      setTasks(updated);
      SUCCESS_NOTIFICATION("Task deleted!", updated);
      console.log(updated);
    } catch (err) {
      SUCCESS_NOTIFICATION(err, "Task Deleted Failed");
    }
  };

  const handleFinish = (values) => {
    try {
      const refImg = fileList[0]?.thumbUrl || editingTask?.referenceImage || "";
      const newTask = { ...values, id: editingTask ? editingTask.id : Date.now(), referenceImage: refImg, eta: values.eta.toISOString() };
      const updated = editingTask ? tasks.map((t) => (t.id === editingTask.id ? newTask : t)) : [...tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updated));
      setTasks(updated);
      console.log(updated);
      SUCCESS_NOTIFICATION(editingTask ? "Task updated!" : "Task added!");
      setIsModalOpen(false);
      setFileList([]);
    } catch (err) {
      ERROR_NOTIFICATION(err, "Task Updated Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <DefaultHeader title="Project Tasks" />
        <div className="pt-6">
          <CustomButtom type="primary" onClick={openAddModal}>
            Add Task
          </CustomButtom>
        </div>
      </div>

      <CustomModal title={editingTask ? "Edit Task" : "Add Task"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleFinish} className="grid grid-cols-2 gap-4">
          <Form.Item name="project" label="Project" rules={[{ required: true }]}>
            <Select placeholder="Select Project" className="h-[50px]" options={projects.map((p) => ({ label: p.title, value: p.title }))} />
          </Form.Item>
          <Form.Item name="title" label="Task Title" rules={[{ required: true }]}>
            <Input className="h-[50px]" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea className="h-[50px]" rows={2} />
          </Form.Item>
          <Form.Item name="employee" label="Assign Employee" rules={[{ required: true }]}>
            <Select mode="multiple" options={employees.map((e) => ({ label: e.name, value: e.name }))} className="h-[50px]" />
          </Form.Item>
          <Form.Item name="eta" label="ETA" rules={[{ required: true }]}>
            <DatePicker className="w-full h-[50px]" />
          </Form.Item>
          <Form.Item label="Reference Image">
            <Upload.Dragger
              listType="picture"
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
              fileList={fileList}
              onRemove={() => setFileList([])}
              className="h-[50px]"
            >
              <Button icon={<BsInboxes />}>Upload</Button>
            </Upload.Dragger>
          </Form.Item>
          <CustomButtom type="primary" htmlType="submit" className="w-full mt-2">
            {editingTask ? "Update Task" : "Create Task"}
          </CustomButtom>
        </Form>
      </CustomModal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {tasks.map((task) => (
          <Card
            key={task.id}
            title={task.title}
            extra={<span>{task.project}</span>}
            actions={[
              <EditOutlined onClick={() => openEditModal(task)} />,
              <Popconfirm title="Delete task?" onConfirm={() => handleDelete(task.id)}>
                <DeleteOutlined />
              </Popconfirm>,
            ]}
          >
            <p>{task.description}</p>
            <p className="text-sm text-gray-500 mt-1">Assigned: {task.employee}</p>
            <p className="text-sm">ETA: {dayjs(task.eta).format("YYYY-MM-DD")}</p>
            {task.referenceImage && <img src={task.referenceImage} alt="ref" className="mt-2 h-24 object-cover" />}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectTask;
