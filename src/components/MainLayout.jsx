"use client";
import { useEffect, useState } from "react";
import { LogoutOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";
import axios from "axios";
import { BASE_URL } from "@/utils/config";

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout, token } = useAuth();
  const { conversationsList, setConversationsList } = useLayout();

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${BASE_URL}/chat?user_id=${user.id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setConversationsList(res.data || []);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user?.id, token]);

  const items = [
    getItem(<Link href={"/login"}>ورود و ثبت نام</Link>, "1", <UserOutlined />),
    getItem(
      "گفتگو ها",
      "sub1",
      <MessageOutlined />,
      conversationsList?.map((conv) =>
        getItem(
          <Link href={`/chat/${conv.id}`} className="truncate block max-w-[150px]">
            {conv.title}
          </Link>,
          String(conv.id)
        )
      )
    ),
    getItem(
      <Button type="text" onClick={() => logout()}>
        <Link href={"/login"}>خروج</Link>
      </Button>,
      "9",
      <LogoutOutlined />
    ),
  ];

  return (
    <Layout>
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
          <img src="/next.svg" width={128} alt="Next Logo" />
        </div>
        <Menu theme="light" mode="inline" items={items} />
      </Sider>

      <Layout>
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Chat AI ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;