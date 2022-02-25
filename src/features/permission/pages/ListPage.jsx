import { DeleteOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import permissionAPI from 'api/permissionAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import moment from 'moment';
import queryString from 'query-string';
import React, { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { transformDateToString } from 'utils';
import PermissionFilter from '../components/PermissionFilter';
import PermissionTable from '../components/PermissionTable';

const defaultPagination = {
  page: 1,
  limit: 10,
};

const breadcrumb = [{ path: '', active: true, name: 'Phân quyền' }];

function ListPage(props) {
  const history = useHistory();
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    const { code, type, status, created_from, created_to, used_from, used_to, limit, page } = params;
    return {
      ...params,
      code: code ? code : undefined,
      type: type ? Number(type) : undefined,
      status: status ? Number(status) : undefined,
      created_from: created_from ? moment(created_from) : undefined,
      created_to: created_to ? moment(created_to) : undefined,
      used_from: used_from ? moment(used_from) : undefined,
      used_to: used_to ? moment(used_to) : undefined,
      limit: limit ? Number(limit) : defaultPagination.limit,
      page: page ? Number(page) : defaultPagination.page,
    };
  }, [location.search]);

  const handlePageChange = ({ current, pageSize }) => {
    handleFilterChange({ limit: pageSize, page: current });
  };

  const handleFilterChange = (newFilter) => {
    const filter = {
      ...queryParams,
      ...newFilter,
    };

    // clean data before sync to url
    const dateKeys = ['created_from', 'created_to', 'used_from', 'used_to'];
    dateKeys.forEach((dateKey) => {
      if (filter[dateKey]) {
        filter[dateKey] = transformDateToString(filter[dateKey]);
      }
    });

    // delete page key before sync to url except change page
    if (!newFilter.page) {
      filter.page = defaultPagination.page;
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const resetFilter = () => {
    const defaultFilter = {};

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(defaultFilter),
    });
  };

  const { data = {}, isLoading, isError } = useQuery(['permission', queryParams], () => permissionAPI.getAll(queryParams));
  const pagination = {
    page: queryParams.page,
    limit: queryParams.limit,
    total: data.pagination?.count,
  };

  // if (isError) {
  //   return <Error />;
  // }

  const queryClient = useQueryClient();

  const { mutate, isLoading: deleteLoading } = useMutation((id) => permissionAPI.delete(id), {
    onError: () => {
      message.error('Xóa thất bại');
    },

    onSuccess: () => {
      message.success('Xóa thành công');
      queryClient.invalidateQueries('permission');
    },
  });

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn chắc chắn đồng ý xóa?',
      icon: <DeleteOutlined />,
      confirmLoading: deleteLoading,
      okText: 'Đồng ý',
      cancelText: 'Hủy bỏ',
      onOk: () => mutate(id),
    });
  };

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        {/* <PermissionFilter filter={queryParams} onFilterChange={handleFilterChange} onResetFilter={resetFilter} /> */}
        <PermissionTable
          list={data.data}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

ListPage.propTypes = {};

export default ListPage;
