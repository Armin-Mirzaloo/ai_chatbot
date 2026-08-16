"use client";
import { useState } from "react";
import {
  LogoutOutlined,
  FileOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link href={"../login"}>ورود و ثبت نام</Link>, "1", <UserOutlined />),
  getItem(<Link href="">گفتگو ها</Link>, "sub1", <MessageOutlined />, [
    getItem(<Link href={`/chat/${1}`}>سلام چطوری</Link>, "3"),
    getItem(<Link href={`/chat/${2}`}>تست اپ</Link>, "4"),
    getItem(<Link href={`/chat/${3}`}>درباره Next.js</Link>, "5"),
  ]),
  getItem(<Link href={"/exit"}>خروج</Link>, "9", <LogoutOutlined />),
];

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        // minHeight: "100vh",
      }}
    >
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{ textAlign: "-webkit-center" }}
          className="w-100 text-center mt-5 mb-5 ml-2 mr-2"
        >
          <img src="/next.svg" width={128} />
        </div>
        <Menu
          theme="light"
          // defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {children}
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Chat AI ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;