"use client";
import { BASE_URL } from "@/utils/config";
import { passwordHasher } from "@/utils/passwordHasher";
import { Button, Card, Form, Input, message } from "antd";
//import "@ant-design/v5-patch-for-react-19";
import axios from "axios";

export default function RegisterPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  return (
    <div className="flex h-screen text-center justify-center mt-5">
      {contextHolder}
      <Card className="h-auto login-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={async (value) => {
            console.log(value);
            //value.password = await passwordHasher(value.password)
            axios.post(`${BASE_URL}/register`, value).then((res) => {
              console.log(res);
              form.resetFields()
              messageApi.open({
                type: "success",
                content: "کاربر با موفقیت ثبت نام شد",
              });
            });
          }}
          onFinishFailed={(err) => {console.log(err);
            messageApi.open({
              type: "warning",
              content: "مشکلی رخ داده است",
            });
          }
        }
        >
          <Form.Item 
          rules={[
            {
              required: true,
              message: "لطفا نام و نام خانوادگی را وارد کنید"
            }
          ]}
          name={"name"} label="نام و نام خانوادگی">
            <Input />
          </Form.Item>
          <Form.Item
          rules={[
            {
              required: true,
              message: "لطفا ایمیل را وارد کنید"
            }
          ]}
          name={"email"} label="پست الکترونیکی">
            <Input type="email" />
          </Form.Item>
          <Form.Item 
          rules={[
            {
              required: true,
              message: "لطفا نام کاربری را وارد کنید"
            }
          ]}
          name={"username"} label="نام کاربری">
            <Input />
          </Form.Item>
          <Form.Item 
          rules={[
            {
              required: true,
              message: "لطفا رمز عبور را وارد کنید"
            }
          ]}
          name={"password"} label="رمزعبور">
            <Input.Password type="password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" block color="primary">ثبت نام</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}