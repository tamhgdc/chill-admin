import { message } from 'antd';
import userAPI from 'api/userAPI';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../components/UserForm';
import { changeValue } from '../authSlice';
import Breadcrumb from 'components/Breadcrumb';

function UserDetail(props) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.current);
  const { data: { data = {} } = {}, isLoading, isError } = useQuery(['user-detail', user], () => userAPI.get(user._id));

  const { mutate, isLoading: updateLoading } = useMutation(({ id, data }) => userAPI.update(id, data), {
    onSuccess: (data) => {
      dispatch(changeValue({ name: 'current', value: data.data }));
      message.success('Cập nhật thành công!');
    },

    onError: () => {
      message.error('Cập nhật thất bại!');
    },

    onSettled: () => {
      queryClient.invalidateQueries('user-detail');
    },
  });

  const handleUpdate = async (id, data) => {
    if (updateLoading) return;
    mutate({ id, data });
  };

  const breadcrumb = [{ path: '/', active: true, name: 'Quản lý tài khoản' }];

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <UserForm data={data} onUpdate={handleUpdate} updateLoading={updateLoading} />
      </div>
    </div>
  );
}

UserDetail.propTypes = {};

export default UserDetail;
