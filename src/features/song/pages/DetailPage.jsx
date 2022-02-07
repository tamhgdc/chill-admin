import { message } from 'antd';
import songAPI from 'api/songAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import Loading from 'components/Loading';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import SongForm from '../components/SongForm';

function DetailPage(props) {
  const {
    params: { id },
  } = useRouteMatch();

  const queryClient = useQueryClient();

  const breadcrumb = [
    { path: '/songs', name: 'Bài hát' },
    { path: '', active: false, name: 'Chi tiết bài hát' },
  ];

  const { data = {}, isLoading: getLoading, isError } = useQuery(['song', id], () => songAPI.get(id));

  const { mutate, isLoading: updateLoading } = useMutation(({ id, data }) => songAPI.update(id, data), {
    onError: () => {
      message.error('Cập nhật bài hát thất bại!');
    },

    onSuccess: () => {
      message.success('Cập nhật bài hát thành công!');
    },

    onSettled: () => {
      queryClient.invalidateQueries('song');
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
          <SongForm
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
