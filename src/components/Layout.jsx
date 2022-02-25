import {
  BarcodeOutlined,
  DesktopOutlined,
  GitlabOutlined,
  PieChartOutlined,
  SnippetsOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import NotFound from 'components/NotFound';
import _ from 'lodash';
import React, { lazy, Suspense, useState } from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';

const SongFeature = lazy(() => import('features/song'));
const UserFeature = lazy(() => import('features/user'));
const AlbumFeature = lazy(() => import('features/album'));
const PlaylistFeature = lazy(() => import('features/playlist'));
const ArtistFeature = lazy(() => import('features/artist'));
const CategoryFeature = lazy(() => import('features/category'));
const PermissionFeature = lazy(() => import('features/permission'));
const DashboardFeature = lazy(() => import('features/dashboard'));
const ChangePasswordPage = lazy(() => import('features/auth/pages/ChangPassword'));
const InfoPage = lazy(() => import('features/auth/pages/UserDetail'));



const { Header: LayoutHeader, Sider, Content, Footer: LayoutFooter } = Layout;

export default function DefaultLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const computedDefaultSelectedKey = () => {
    let pathname = location.pathname.split('/');
    pathname = _.slice(pathname, 0, 2);
    return _.tail(pathname);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle} className="default-layout-sider">
        <Link to="/" className="layout-logo-wrapper">
          {collapsed ? <img className="layout-logo-img" src={logo} /> : <span className="layout-logo-text">ADMIN</span>}
        </Link>

        <Menu className="layout-menu" theme="dark" defaultSelectedKeys={computedDefaultSelectedKey()}>
          <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
            Dashboard
            <Link to="/dashboard" />
          </Menu.Item>

          <Menu.Item key="users" icon={<UserOutlined />}>
            Quản lý người dùng
            <Link to="/users" />
          </Menu.Item>

          <Menu.Item key="songs" icon={<DesktopOutlined />}>
            Quản lý bài hát
            <Link to="/songs" />
          </Menu.Item>

          <Menu.Item key="albums" icon={<SnippetsOutlined />}>
            Quản lý album
            <Link to="/albums" />
          </Menu.Item>

          <Menu.Item key="playlists" icon={<GitlabOutlined />}>
            Quản lý playlist
            <Link to="/playlists" />
          </Menu.Item>

          <Menu.Item key="artists" icon={<UserOutlined />}>
            Quản lý ca sĩ
            <Link to="/artists" />
          </Menu.Item>

          <Menu.Item key="categories" icon={<BarcodeOutlined />}>
            Quản lý thể loại
            <Link to="/categories" />
          </Menu.Item>

          <Menu.Item key="permission" icon={<UsergroupAddOutlined />}>
            Quản lý phần quyền
            <Link to="/permission" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <LayoutHeader className="site-layout-background" style={{ padding: 0 }}>
          <Header />
        </LayoutHeader>
        <Content>
          <div className="site-layout-content">
            <Suspense fallback={<Loading />}>
              <Switch>
                <Redirect from="/" to="/dashboard" exact />
                <Route path="/dashboard" component={DashboardFeature} />
                <Route path="/songs" component={SongFeature} />
                <Route path="/users" component={UserFeature} />
                <Route path="/artists" component={ArtistFeature} />
                <Route path="/playlists" component={PlaylistFeature} />
                <Route path="/albums" component={AlbumFeature} />
                <Route path="/categories" component={CategoryFeature} />
                <Route path="/permission" component={PermissionFeature} />
                <Route path="/change-pw" exact component={ChangePasswordPage} />
                <Route path="/my-account" exact component={InfoPage} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </div>
        </Content>
        <LayoutFooter style={{ textAlign: 'center', paddingLeft: collapsed ? '100px' : '220px' }}>
          <Footer />
        </LayoutFooter>
      </Layout>
    </Layout>
  );
}
