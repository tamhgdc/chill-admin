import { UserOutlined } from '@ant-design/icons';
import { Menu, Divider, Avatar } from 'antd';
import React from 'react';
const { SubMenu } = Menu;

// src="https://joeschmoe.io/api/v1/random"
function Header(props) {
  return (
    <header>
      <Menu mode="horizontal" style={{ justifyContent: 'flex-end' }}>
        <SubMenu key="SubMenu" icon={<Avatar icon={<UserOutlined />} />} title="Andres"> 
          <Menu.Item key="account">Tài khoản</Menu.Item>
          <Menu.Item key="forgot-pw">Đổi mật khẩu</Menu.Item>
          <Divider className="m-0" />
          <Menu.Item key="logout">Đăng xuất</Menu.Item>
        </SubMenu>
      </Menu>
    </header>
  );
}

Header.propTypes = {};

export default Header;
