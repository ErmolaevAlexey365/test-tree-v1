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

const MainWrapper = () => {
  console.log('div');

  return (
    <Layout hasSider>
      <Sider className={styles.sider}>
        <Menu className={styles.menu} theme="dark" mode="inline" defaultSelectedKeys={['demo']} items={items} />
      </Sider>
      <Layout className={styles.layout}>
        <Header />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainWrapper;
