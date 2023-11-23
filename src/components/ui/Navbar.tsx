import logo from "@/assets/logo.png";
import { authKey } from "@/constants/storageKey";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import {
  DashboardOutlined,
  FileTextOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Layout, Menu, MenuProps, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoggedUser, setIsLoggedUser] = useState<boolean>(false);

  const isLogged = isLoggedIn();

  useEffect(() => {
    if (isLogged) {
      setIsLoggedUser(isLogged);
    }
  }, [isLogged]);

  const logout = () => {
    removeUserInfo(authKey);
    setIsLoggedUser(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const menuItems: MenuProps["items"] = [
    {
      label: <Link href="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link href="/events">Events</Link>,
      key: "events",
      icon: <ScheduleOutlined />,
    },
    {
      label: <Link href="/blogs">Blogs</Link>,
      key: "blogs",
      icon: <FileTextOutlined />,
    },
    {
      label: <Link href="/about-us">About Us</Link>,
      key: "about-us",
      icon: <InfoCircleOutlined />,
    },
    {
      label: <Link href="/contact-us">Contact Us</Link>,
      key: "contact-us",
      icon: <MailOutlined />,
    },
    {
      label: isLoggedUser && <Link href="/dashboard">Dashboard</Link>,
      key: "Dashboard",
      icon: isLoggedUser && <DashboardOutlined />,
    },
    {
      label: !isLoggedUser && (
        <Link href="/signin">
          <Button
            icon={<LoginOutlined />}
            type="primary"
            style={{ marginRight: "10px" }}
          >
            Sign in
          </Button>
        </Link>
      ),
      key: "signin",
    },
    {
      label: !isLoggedUser && (
        <Link href="/signup">
          <Button>Sign up</Button>
        </Link>
      ),
      key: "signup",
    },

    {
      label: isLoggedUser && (
        <Button
          onClick={() => logout()}
          icon={<LogoutOutlined />}
          type="primary"
        >
          Log Out
        </Button>
      ),
      key: "logout",
    },
  ];

  return (
    <Layout
      style={{
        padding: "10px 20px",
      }}
      className=""
    >
      <Header suppressHydrationWarning={true} style={{ padding: 0 }}>
        <Row justify="space-between" align="middle">
          <Col xs={20} sm={20} md={4}>
            <div style={{ color: "#EDF4ED", paddingLeft: "20px" }}>
              <Link href="/">
                <Image width={120} height={60} src={logo} alt="logo" />
              </Link>
            </div>
          </Col>
          <Col xs={0} sm={0} md={20}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={menuItems}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                border: "none",
              }}
            ></Menu>
          </Col>
          <Col xs={4} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer
          placement="left"
          onClick={onClose}
          onClose={onClose}
          open={visible}
        >
          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={menuItems}
          ></Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;
