import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons/';
import { Button, Card, Empty, Table, Tag } from 'antd';
import { statuses } from 'constants';
import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { findInArr } from 'utils';

function PermissionTable({ list, isLoading, pagination, onPageChange, onDelete }) {
  const history = useHistory();
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      width: 150,
      key: 'isActive',
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
                pathname: `/permission/${value?._id}`,
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
      title="Danh sách phân quyền"
      extra={
        <Button icon={<PlusOutlined />} type="primary" onClick={() => history.push('/permission/add')}>
          Thêm phân quyền
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
          showTotal: (total, range) => `${total} phân quyền | Từ ${range[0]} đến ${range[1]}`,
          showSizeChanger: false,
          showLessItems: true,
        }}
        scroll={{ x: 1500 }}
        loading={isLoading}
      />
    </Card>
  );
}

export default PermissionTable;
