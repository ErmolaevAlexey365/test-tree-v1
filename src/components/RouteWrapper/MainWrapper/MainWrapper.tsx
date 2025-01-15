import { AreaChartOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainWrapper.scss';

const { Header, Content, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'demo',
    icon: <AreaChartOutlined />,
    label: `Demo Tree`,
  },
];

const MainWrapper = () => (
  <Layout hasSider>
    <Sider className={styles.sider} breakpoint="lg" collapsedWidth="60" collapsed>
      <Menu className={styles.menu} theme="dark" mode="inline" defaultSelectedKeys={['demo']} items={items} />
    </Sider>
    <Layout className={styles.layout}>
      <Header />
      <Content className={styles.content}>
        <div className={styles.outletWrapper}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  </Layout>
);

export default MainWrapper;
