import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state) => state.register.loading);

  const onFinish = async (values) => {
    dispatch({
      type: "registerStart",
    });
    try {
      await axios.post("/auth/register", {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      });
      dispatch({
        type: "registerSuccess",
      });
      message.info("注册成功");
      history.push("/login");
    } catch (e) {
      dispatch({
        type: "registerFailed",
        payload: e.message,
      });
      message.info(`注册失败：${e.message}`);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      className={styles["register-form"]}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
