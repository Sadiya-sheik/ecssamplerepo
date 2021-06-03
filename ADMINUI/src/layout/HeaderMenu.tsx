
import React from "react";
import { Header } from "antd/lib/layout/layout";

import "./styles/header.css";
import logo from "../assets/logo_vinlocity.png";
import {  Button, Col, Dropdown,  Menu, Row } from "antd";
import {  UserOutlined } from "@ant-design/icons";
import SearchBox from "./SearchBox";
import useAuthSerice from "../hooks/useAuthService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/createStore";

const HeaderMenu = () => {
  const { logout, requestProfileData } = useAuthSerice();
  const { userProfile } = useSelector((state: RootState) => state.Auth);

  React.useEffect(() => {
    requestProfileData();
  }, []);

  const userProfileMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button type="link" onClick={() => {}}>
          Profile
        </Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="link" onClick={() => logout()}>
          Logout
        </Button>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  return (
    <Header className="header-div">
      <Row>
        <Col span={3}>
          <img src={logo} className="brand-logo" alt="Vinlocity logo" />
        </Col>
        <Col span={6}></Col>

        <Col span={5}>
          <SearchBox />
        </Col>
        <Col span={5}></Col>
        <Col span={3}>
          <span className="logged-user">
            Hi {userProfile.surname || "Guest"} (admin)
          </span>
        </Col>
        <Col span={2}>
          <Dropdown overlay={userProfileMenu} trigger={["click"]}>
            <a
              href="#"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <UserOutlined />
            </a>
            {/* <Avatar className="header-avatar">
              <UserOutlined />
            </Avatar> */}
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};
export default HeaderMenu;
