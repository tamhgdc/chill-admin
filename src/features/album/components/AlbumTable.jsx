import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons/';
import { Button, Card, Empty, Table, Tag } from 'antd';
import { statuses } from 'constants';
import { findInArr, formatDate } from 'utils';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AlbumTable({ list, isLoading, pagination, onPageChange, onDelete }) {
  const history = useHistory();
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ca sỹ',
      dataIndex: 'artist',
      key: 'artist',
      render: (value) => <Link to={`/artists/${value?._id}`}>{value?.fullName}</Link>,
    },
    {
      title: 'Thể loại',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Lượt nghe',
      dataIndex: 'view',
      width: 150,
      key: 'view',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 150,
      key: 'createdAt',
      render: (value) => {
        return formatDate(value);
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      width: 150,
      render: (value) => {
        const status = findInArr(statuses, value);
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
          <Fragment>
            <Button danger icon={<DeleteOutlined />} className="me-2" onClick={() => onDelete(value?._id)} />
            <Link
              to={{
                pathname: `/albums/${value?._id}`,
              }}
            >
              <Button type="primary" icon={<EyeOutlined />} />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  return (
    <Card
      title="Danh sách album"
      extra={
        <Button icon={<PlusOutlined />} type="primary" onClick={() => history.push('/albums/add')}>
          Thêm album
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
          pageSize: pagination.limit,
          current: pagination.page,
          position: ['topRight', 'bottomRight'],
          showTotal: (total, range) => `${total} album | Từ ${range[0]} đến ${range[1]}`,
          showSizeChanger: false,
          showLessItems: true,
        }}
        scroll={{ x: 1500 }}
        loading={isLoading}
      />
    </Card>
  );
}

export default AlbumTable;
