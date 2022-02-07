import { Spin } from 'antd';
import React from 'react';

function Loading(props) {
  return (
    <div className="primary-loading">
      <Spin size="large" tip="Đang tải" />
    </div>
  );
}

Loading.propTypes = {};

export default Loading;
