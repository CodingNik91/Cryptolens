import React from 'react';
import { Spin, Typography } from 'antd';

const Loader = ({ text }) => (
  <div className="loader">
    {text && <Typography.Title level={3}>{text}</Typography.Title>}
    <Spin />
  </div>
);

export default Loader;