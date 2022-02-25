import { message } from 'antd';
import userAPI from 'api/userAPI';
import Breadcrumb from 'components/Breadcrumb';
import React from 'react';
import { useMutation } from 'react-query';
import ChangePassForm from '../components/ChangePassForm';

function ChangePassword(props) {
  const { mutate, isLoading } = useMutation(({ data }) => userAPI.changePassword(data), {
    onSuccess: () => {
      message.success('Cập nhật mật khẩu thành công!');
    },

    onError: () => {
      message.error('Cập nhật mật khẩu thất bại!');
    },
  });

  const handleUpdate = async (data) => {
    mutate({ data });
  };
  const breadcrumb = [{ path: '/', active: true, name: 'Đổi mật khẩu' }];

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <ChangePassForm onSubmit={handleUpdate} isLoading={isLoading} />
      </div>
    </div>
  );
}

ChangePassword.propTypes = {};

export default ChangePassword;
