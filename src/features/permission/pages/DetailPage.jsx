import { message } from 'antd';
import permissionAPI from 'api/permissionAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import Loading from 'components/Loading';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import PermissionForm from '../components/PermissionForm';

function DetailPage(props) {
  const {
    params: { id },
  } = useRouteMatch();

  const queryClient = useQueryClient();

  const breadcrumb = [
    { path: '/permission', name: 'Phần quyền' },
    { path: '', active: true, name: 'Chi tiết phần quyền' },
  ];

  const { data = {}, isLoading: getLoading, isError } = useQuery(['permission', id], () => permissionAPI.get(id));

  const { mutate, isLoading: updateLoading } = useMutation(({ id, data }) => permissionAPI.update(id, data), {
    onError: () => {
      message.error('Cập nhật phần quyền thất bại!');
    },

    onSuccess: () => {
      message.success('Cập nhật phần quyền thành công!');
    },

    onSettled: () => {
      queryClient.invalidateQueries('permission');
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
          <PermissionForm
            data={data.data}
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
