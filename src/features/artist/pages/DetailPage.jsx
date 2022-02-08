import { message } from 'antd';
import artistAPI from 'api/artistAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import Loading from 'components/Loading';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import ArtistForm from '../components/ArtistForm';

function DetailPage(props) {
  const {
    params: { id },
  } = useRouteMatch();

  const queryClient = useQueryClient();

  const breadcrumb = [
    { path: '/artists', name: 'Nghệ sỹ' },
    { path: '', active: true, name: 'Chi tiết nghệ sỹ' },
  ];

  const { data = {}, isLoading: getLoading, isError } = useQuery(['artist', id], () => artistAPI.get(id));

  const { mutate, isLoading: updateLoading } = useMutation(({ id, data }) => artistAPI.update(id, data), {
    onError: () => {
      message.error('Cập nhật nghệ sỹ thất bại!');
    },

    onSuccess: () => {
      message.success('Cập nhật nghệ sỹ thành công!');
    },

    onSettled: () => {
      queryClient.invalidateQueries('artist');
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
          <ArtistForm
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
