"use client";
import { useAuth } from "@/context/AuthContext";
import { BASE_URL } from "@/utils/config";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";

export default function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const {user, login} = useAuth()
  const [form] = Form.useForm();

  return (
    <div className="flex h-screen text-center justify-center mt-5">
      {contextHolder}
      <Card className="h-auto login-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={async (value) => {
            console.log(value);
            axios
              .post(`${BASE_URL}/login`, value)
              .then((res) => {
                console.log(res);
                login(res.data.token)
                form.resetFields();
                messageApi.open({
                  type: "success",
                  content: "ورود با موفقیت انجام شد",
                });
              })
              .catch((err) => {
                console.log(err);
                messageApi.open({
                  type: "error",
                  content:
                    err.response?.data?.error || "مشکلی در ورود رخ داده است",
                });
              });
          }}
          onFinishFailed={(err) => {
            console.log(err);
            messageApi.open({
              type: "warning",
              content: "مشکلی رخ داده است",
            });
          }}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "نام کاربری خود را وارد کنید",
              },
            ]}
            name={"username"}
            label="نام کاربری"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "رمز عبور خود را وارد کنید",
              },
            ]}
            name={"password"}
            label="رمزعبور"
          >
            <Input.Password type="password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" block color="primary">
              ورود
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}