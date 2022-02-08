import { Button, Checkbox, Form, Input, message } from 'antd';
import { StorageKeys } from 'constants';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { login } from '../../auth/authSlice';

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const payload = { ...values };
      delete payload.remember;
      const data = await dispatch(login(payload)).unwrap();
      localStorage.setItem(StorageKeys.LOGIN, JSON.stringify(values));
      history.push('/');
      message.success('Đăng nhập thành công');
    } catch (error) {
      message.error('Đăng nhập không thành công');
    }
  };

  if (Boolean(localStorage.getItem(StorageKeys.ACCESS_TOKEN))) {
    return <Redirect to="/" />;
  }

  const handleValuesChange = (changedValue, allValues) => {
    if (changedValue.hasOwnProperty('remember') && !changedValue.remember) {
      localStorage.removeItem(StorageKeys.LOGIN);
    }
  };

  return (
    <div className="login-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={JSON.parse(localStorage.getItem(StorageKeys.LOGIN))}
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng điền email' },
            {
              type: 'email',
              message: 'Vui lòng nhập email hợp lệ',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng điền mật khẩu' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Nhớ mật khẩu</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
