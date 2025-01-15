import { App } from 'antd';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const AppWrapper = () => (
  <App>
    <Outlet />
  </App>
);
export default memo(AppWrapper);
