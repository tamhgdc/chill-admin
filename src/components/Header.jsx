import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Menu } from 'antd';
import { logout } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { SubMenu } = Menu;

// src="https://joeschmoe.io/api/v1/random"
function Header(props) {
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Menu mode="horizontal" style={{ justifyContent: 'flex-end' }}>
        <SubMenu
          key="SubMenu"
          icon={<Avatar icon={<UserOutlined />} src={user.avatarURL} />}
          title={user?.fullName || 'Unknow'}
        >
          <Menu.Item key="account">Tài khoản</Menu.Item>
          <Menu.Item key="forgot-pw">Đổi mật khẩu</Menu.Item>
          <Divider className="m-0" />
          <Menu.Item key="logout" onClick={handleLogoutClick}>
            Đăng xuất
          </Menu.Item>
        </SubMenu>
      </Menu>
    </header>
  );
}

Header.propTypes = {};

export default Header;
