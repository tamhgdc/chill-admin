import { message } from 'antd';
import albumAPI from 'api/albumAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import Loading from 'components/Loading';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import AlbumForm from '../components/AlbumForm';

function DetailPage(props) {
  const {
    params: { id },
  } = useRouteMatch();

  const queryClient = useQueryClient();

  const breadcrumb = [
    { path: '/albums', name: 'Album' },
    { path: '', active: true, name: 'Chi tiết album' },
  ];

  const { data = {}, isLoading: getLoading, isError } = useQuery(['album', id], () => albumAPI.getDetail(id));

  const { mutate, isLoading: updateLoading } = useMutation(({ id, data }) => albumAPI.update(id, data), {
    onError: () => {
      message.error('Cập nhật album thất bại!');
    },

    onSuccess: () => {
      message.success('Cập nhật album thành công!');
    },

    onSettled: () => {
      queryClient.invalidateQueries('album');
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
          <AlbumForm
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
