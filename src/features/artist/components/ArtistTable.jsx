import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons/';
import { Button, Card, Empty, Table, Tag } from 'antd';
import { statuses } from 'constants';
import { findInArr, formatDate } from 'utils';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { genderList } from 'constants';

function ArtistTable({ list, isLoading, pagination, onPageChange, onDelete }) {
  const history = useHistory();
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      width: 150,
      key: 'gender',
      render: (value) => findInArr(genderList, value, 'name'),
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      width: 150,
      key: 'dateOfBirth',
      render: (value) => {
        return formatDate(value);
      },
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
                pathname: `/artists/${value?._id}`,
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
      title="Danh sách ca sĩ"
      extra={
        <Button icon={<PlusOutlined />} type="primary" onClick={() => history.push('/artists/add')}>
          Thêm ca sĩ
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
          showTotal: (total, range) => `${total} ca sĩ | Từ ${range[0]} đến ${range[1]}`,
          showSizeChanger: false,
          showLessItems: true,
        }}
        scroll={{ x: 1500 }}
        loading={isLoading}
      />
    </Card>
  );
}

export default ArtistTable;
