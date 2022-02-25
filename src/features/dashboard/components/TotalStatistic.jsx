import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Statistic } from 'antd';
import { useQuery } from 'react-query';
import siteAPI from 'api/siteAPI';

function Total(props) {
  const { data: count = {}, isLoading: countLoading } = useQuery('total', () => siteAPI.getCount(), {
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
            <Statistic title="Tổng số lượng ca sĩ" value={artistCount} />
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
  );
}

Total.propTypes = {};

export default Total;
