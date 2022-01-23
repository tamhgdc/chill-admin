import { message } from 'antd';
import userAPI from 'api/userAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import Loading from 'components/Loading';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import UserForm from '../components/UserForm';

function DetailPage(props) {
  const {
    params: { id },
  } = useRouteMatch();

  const queryClient = useQueryClient();

  const breadcrumb = [
    { path: '/users', name: 'Người dùng' },
    { path: '', active: false, name: 'Chi tiết người dùng' },
  ];

  const { data = {}, isLoading: getLoading, isError } = useQuery(['user', id], () => userAPI.getById(id));

  const { mutate, isLoading: updateLoading } = useMutation(({ id, data }) => userAPI.update(id, data), {
    onError: () => {
      message.error('Cập nhật người dùng thất bại!');
    },

    onSuccess: () => {
      message.success('Cập nhật người dùng thành công!');
    },

    onSettled: () => {
      queryClient.invalidateQueries('user');
    },
  });

  const handleUpdate = (id, data) => {
    mutate({ id, data });
  };

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      {!getLoading && (
        <div className="content-padding">
          <UserForm
            data={data}
            updateLoading={updateLoading}
            onUpdate={handleUpdate}
          />
        </div>
      )}

      {getLoading && <Loading />}
      {isError && <Error />}
    </div>
  );
}

DetailPage.propTypes = {};

export default DetailPage;
