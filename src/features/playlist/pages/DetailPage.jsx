import { message } from 'antd';
import playlistAPI from 'api/playlistAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import Loading from 'components/Loading';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import PlaylistForm from '../components/PlaylistForm';

function DetailPage(props) {
  const {
    params: { id },
  } = useRouteMatch();

  const queryClient = useQueryClient();

  const breadcrumb = [
    { path: '/playlists', name: 'Playlist' },
    { path: '', active: false, name: 'Chi tiết playlist' },
  ];

  const { data = {}, isLoading: getLoading, isError } = useQuery(['playlist', id], () => playlistAPI.getById(id));

  const { mutate, isLoading: updateLoading } = useMutation(({ id, data }) => playlistAPI.update(id, data), {
    onError: () => {
      message.error('Cập nhật playlist thất bại!');
    },

    onSuccess: () => {
      message.success('Cập nhật playlist thành công!');
    },

    onSettled: () => {
      queryClient.invalidateQueries('playlist');
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
          <PlaylistForm
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
