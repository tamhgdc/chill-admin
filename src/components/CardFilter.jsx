import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'antd';

function CardFilter({ children, resetFilter, hadMore }) {
  const [expand, setExpand] = useState(false);

  return (
    <Card className="card-filter mb-3" title="Bộ lọc">
      <Row gutter={16}>
        <Col span={24}>{children}</Col>
        <Col span={24}>
          <div className="float-end">
            <Button onClick={resetFilter}>Xóa bộ lọc</Button>
            <Button type="primary" htmlType="submit" className="ms-2">
              Tìm kiếm
            </Button>
            {hadMore && (
              <span className="ms-2" onClick={() => setExpand(!expand)} style={{ color: '#008efb', cursor: 'pointer' }}>
                {!expand ? `Mở rộng` : `Thu gọn`}
              </span>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default CardFilter;
