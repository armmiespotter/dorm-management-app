import { Link, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, ConfigProvider } from "antd";
import { useState } from "react";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ConfigProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <NumberOutlined />,
                label: <Link to="/">Home</Link>,
              },
              {
                key: "2",
                icon: <NumberOutlined />,
                label: <Link to="/rooms">Rooms</Link>,
              },
              {
                key: "3",
                icon: <NumberOutlined />,
                label: <Link to="/invoices">Invoices</Link>,
              },
              {
                key: "4",
                icon: <NumberOutlined />,
                label: <Link to="/date-sections">Date Section</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "#FFFFFF" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#FFFFFF",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
