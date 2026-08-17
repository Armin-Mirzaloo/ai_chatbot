"use client";
import { useEffect, useState } from "react";
import {
  LogoutOutlined,
  FileOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";
import axios from "axios";
import { BASE_URL } from "@/utils/config";
import { res } from "@/utils/route-handler-response";

const { Header, Content, Footer, Sider } = Layout;

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
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  const [ConvListLoading, setConvListLoading] = useState(false)
  const {user, logout} = useAuth()
  const {conversationsList, setConversationsList} = useLayout()

  useEffect(() => {
    if(user?.id && !ConvListLoading) {
      setConvListLoading(true)
      axios.get(`${BASE_URL}/chat?user_id=${user.id}`)
      .then((res) => {console.log(res, " is conversations List")
        setConversationsList(res.data)
        setConvListLoading(false)
      })
      .catch((err) => {console.log(err)
        setConvListLoading(false)
      })
      setTimeout(() => {}, 2000)
    } else {
      return
    }
  })

  const items = [
  getItem(<Link href={"../login"}>ورود و ثبت نام</Link>, "1", <UserOutlined />),
  getItem(<Link href="">گفتگو ها</Link>, "sub1", <MessageOutlined />, conversationsList.map((conv) => getItem(<Link href={`/chat/${conv.id}`}>{conv.title}</Link>, conv.id))),
  getItem(<Button type="text" onClick={() => logout()}><Link href={"/login"}>خروج</Link></Button>, "9", <LogoutOutlined />),
];

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