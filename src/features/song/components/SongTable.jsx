import { EyeOutlined, PlusOutlined } from '@ant-design/icons/';
import { Button, Card, Empty, Table, Tag } from 'antd';
import { findById, statuses } from 'constants';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SongTable({ list, isLoading, pagination, onPageChange }) {
  const history = useHistory()
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value) => {
        const status = findById(value, statuses);
        return <Tag color={status.color}>{status.name}</Tag>;
      },
    },
    {
      title: 'Hành động',
      width: 150,
      fixed: 'right',
      align: 'center',
      render: (value) => {
        return (
          <Link
            to={{
              pathname: `/members/${value.id}`,
            }}
          >
            <Button type="primary" icon={<EyeOutlined />} />
          </Link>
        );
      },
    },
  ];

  return (
    <Card
      title="Danh sách bài hát"
      extra={
        <Button icon={<PlusOutlined />} type="primary" onClick={() => history.push('/songs/add')}>
          Thêm bài hát
        </Button>
      }
    >
      <Table
        locale={{
          emptyText: <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
        }}
        dataSource={list || []}
        columns={columns}
        onChange={onPageChange}
        pagination={{
          total: pagination.total,
          pageSize: pagination.perPage,
          current: pagination.page,
          position: ['topRight', 'bottomRight'],
          showTotal: (total, range) => `${total} bài hát | Từ ${range[0]} đến ${range[1]}`,
          showSizeChanger: false,
          showLessItems: true,
        }}
        scroll={{ x: 1500 }}
        loading={isLoading}
      />
    </Card>
  );
}

export default SongTable;
