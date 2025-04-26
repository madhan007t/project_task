import React, { useEffect, useState } from "react";
import DefaultHeader from "../components/DefaultHeader";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Upload, message, Card, Avatar, Tooltip } from "antd";
import { Controller, useForm } from "react-hook-form";
import { BsInboxes } from "react-icons/bs";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/slices/employeeSlices";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../helper/message_helper";

const { Meta } = Card;

const AddEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const dispatch = useDispatch();

  const employeeschema = yup.object().shape({
    name: yup.string().required("Name is required"),
    position: yup.string().required("Position is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    image: yup.mixed().required("Profile Image is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(employeeschema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      image: null,
    },
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(stored);
  }, []);

  const onSubmit = (data) => {
    let updatedList = [];

    if (editingEmployee) {
      updatedList = employees.map((emp) => (emp.email === editingEmployee.email ? data : emp));
      SUCCESS_NOTIFICATION("Employee updated successfully!");
    } else {
      const emailExists = employees.find((emp) => emp.email === data.email);
      if (emailExists) {
        message.error("Employee with this email already exists.");
        return;
      }
      updatedList = [...employees, data];
      SUCCESS_NOTIFICATION("Employee added successfully!");
    }

    dispatch(addEmployee(data));
    localStorage.setItem("employees", JSON.stringify(updatedList));
    setEmployees(updatedList);
    reset();
    setFileList([]);
    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  const handleEdit = (employee) => {
    try {
      setEditingEmployee(employee);
      setValue("name", employee.name);
      setValue("email", employee.email);
      setValue("position", employee.position);
      setValue("image", employee.image);
      setFileList([
        {
          uid: "-1",
          name: "profile.jpg",
          status: "done",
          url: employee.image,
        },
      ]);
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (email) => {
    try {
      const filtered = employees.filter((emp) => emp.email !== email);
      localStorage.setItem("employees", JSON.stringify(filtered));
      setEmployees(filtered);
      SUCCESS_NOTIFICATION("Employee deleted!");
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <DefaultHeader title="Add Employees" />
        <div className="pt-6">
          <CustomButton
            onClick={() => {
              reset();
              setFileList([]);
              setEditingEmployee(null);
              setIsModalOpen(true);
            }}
          >
            Add +
          </CustomButton>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        onClose={() => {
          reset();
          setFileList([]);
          setEditingEmployee(null);
          setIsModalOpen(false);
        }}
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <Form.Item>
              <Controller name="name" control={control} render={({ field }) => <CustomInput label="Name" placeholder="Enter Employee Name" type="text" required controllerField={field} error={errors.name} />} />
            </Form.Item>

            <Form.Item>
              <Controller name="email" control={control} render={({ field }) => <CustomInput label="Email" placeholder="Enter Email" type="email" required controllerField={field} error={errors.email} />} />
            </Form.Item>
          </div>

          <Form.Item>
            <Controller name="position" control={control} render={({ field }) => <CustomInput label="Position" placeholder="Enter Position" type="text" required controllerField={field} error={errors.position} />} />
          </Form.Item>

          <Form.Item label="Profile Image" validateStatus={errors.image ? "error" : ""} help={errors.image?.message}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Upload.Dragger
                  name="file"
                  multiple={false}
                  accept="image/*"
                  fileList={fileList}
                  onRemove={() => {
                    setFileList([]);
                    field.onChange(null);
                  }}
                  beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      field.onChange(reader.result);
                      setFileList([
                        {
                          uid: "-1",
                          name: file.name,
                          status: "done",
                          url: reader.result,
                        },
                      ]);
                    };
                    reader.readAsDataURL(file);
                    return false;
                  }}
                  listType="picture"
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  }}
                >
                  <p className="center_div">
                    <BsInboxes />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single upload only.</p>
                </Upload.Dragger>
              )}
            />
          </Form.Item>

          <Form.Item>
            <CustomButton htmlType="submit">{editingEmployee ? "Update" : "Submit"}</CustomButton>
          </Form.Item>
        </Form>
      </CustomModal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {employees.map((employee, index) => (
          <Card
            key={index}
            hoverable
            actions={[
              <Tooltip title="Edit" key="edit">
                <EditOutlined onClick={() => handleEdit(employee)} />
              </Tooltip>,
              <Tooltip title="Delete" key="delete">
                <DeleteOutlined onClick={() => handleDelete(employee.email)} />
              </Tooltip>,
            ]}
          >
            <Meta
              avatar={<Avatar size={64} src={employee.image} />}
              title={employee.name}
              description={
                <div>
                  <p className="mb-0 font-semibold">{employee.position}</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddEmployee;
