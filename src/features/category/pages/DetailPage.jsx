import { message } from 'antd';
import categoryAPI from 'api/categoryAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import Loading from 'components/Loading';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import CategoryForm from '../components/CategoryForm';

function DetailPage(props) {
  const {
    params: { id },
  } = useRouteMatch();

  const queryClient = useQueryClient();

  const breadcrumb = [
    { path: '/categories', name: 'Thể loại' },
    { path: '', active: false, name: 'Chi tiết thể loại' },
  ];

  const { data = {}, isLoading: getLoading, isError } = useQuery(['category', id], () => categoryAPI.get(id));

  const { mutate, isLoading: updateLoading } = useMutation(({ id, data }) => categoryAPI.update(id, data), {
    onError: () => {
      message.error('Cập nhật thể loại thất bại!');
    },

    onSuccess: () => {
      message.success('Cập nhật thể loại thành công!');
    },

    onSettled: () => {
      queryClient.invalidateQueries('category');
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
          <CategoryForm
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
