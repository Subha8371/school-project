"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import styles from "./admin.module.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  // const [token, setToken] = useState("");

  const handleSignIn = async ({ email, password }) => {
    try {
      console.log("Attempting to sign in with:", { email, password });
      const response = await axios.post(
        "http://localhost:8080/api/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // console.log("Token stored in localStorage:", response.data.token);
      router.push("/admin/admin-dashboard");
    } catch (error) {
      // console.error("Sign-in error:", error);
      alert("email and password is not matched!");
    }
  };

  useEffect(() => {
    const token=localStorage.getItem("token")
    // setToken(token);

    if (token) {
      router.push("/admin/admin-dashboard");
    }
  }, []);
// console.log(token,"LLLLLLLLLLLLL")
  const onFinish = (values) => {
    handleSignIn(values);
    
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label=""
            rules={[
              {
                type: "email",
                message: "",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
              {
                pattern: /^[A-Za-z0-9.+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "This is not a valid E-mail!",
              },
            ]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label=""
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message: "Password must contain letters and numbers!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign In
            </Button>
            or{" "}
            <Link href="/admin/sign-up">
              Don't have an account? Register now!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Page;
