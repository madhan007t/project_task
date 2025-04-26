import { notification } from "antd";
import _ from "lodash";

export const SUCCESS_NOTIFICATION = (success_message) => {
  return notification.success({ message: _.get(success_message, "data.message", "Success") });
};

export const ERROR_NOTIFICATION = (error_message) => {
  return notification.error({ message: _.get(error_message, "response.data.message", "Error") });
};
export const CUSTOM_ERROR_NOTIFICATION = (error_message) => {
  return notification.error({ message: error_message });
};
