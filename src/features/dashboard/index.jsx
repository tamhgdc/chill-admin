import { Card, Col, Row, Statistic } from 'antd';
import siteAPI from 'api/siteAPI';
import React, { Fragment } from 'react';
import { useQuery } from 'react-query';

function DashBoard(props) {
  const { data: count = {}, isLoading: countLoading } = useQuery('artists', () => siteAPI.getCount(), {
    select: (value) => value?.data,
  });
  const {
    userCount = 0,
    songCount = 0,
    albumCount = 0,
    artistCount = 0,
    playlistCount = 0,
    categoryCount = 0,
  } = count || {};
  return (
    <Fragment>
      <Card title="Thống kê số lượng">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng người dùng hệ thống" value={userCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng bài hát" value={songCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng nghệ sỹ" value={artistCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng album" value={albumCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng playlist" value={playlistCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng thể loại" value={categoryCount} />
            </Card>
          </Col>
        </Row>
      </Card>
      <Card title="Thống kê của tháng" className="mt-30">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng người dùng mới" value={userCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng bài hát mới" value={songCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng nghệ sỹ mới" value={artistCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng album mới" value={albumCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng playlist mới" value={playlistCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số lượng thể loại mới" value={categoryCount} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Tổng số  lượt nghe" value={categoryCount} />
            </Card>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
}

DashBoard.propTypes = {};

export default DashBoard;
